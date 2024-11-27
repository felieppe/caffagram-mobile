import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from "../UserContext"; 
import { login } from "../utils/api";

function Login({ navigation }) {
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingresa un email válido');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  function handleSubmit(e){
    if (!validateForm()) return alert(error);
    e.preventDefault();

    login(email, password).then((res) => {
      if (res.error) {
        setError(res.error);
        return alert(error)
      } else {
        let {_id, username, token } = res

        AsyncStorage.setItem('token', token).then((_) => {
          // setUser({ _id, username, token });
          AsyncStorage.setItem('user', JSON.stringify({ _id, username, token }))
          navigation.navigate('Home');
        });

      }}).catch((error) => {console.error(error)})
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) { navigation.navigate('Home');  }
    };
    checkToken();
  }, []);

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Caffagram</Text>
      <View style={styles.loginForm}>
        <TextInput
          placeholder="email"
          style={styles.loginInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          style={styles.loginInput}
          secureTextEntry
        />
        <Button title="Login" onPress={handleSubmit} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupText}>
          Create account <Text style={styles.signupLink}>here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
  },
  loginForm: {
    width: '80%',
  },
  loginInput: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  signupText: {
    marginTop: 15,
    color: '#333',
  },
  signupLink: {
    color: '#7f82ff',
    fontWeight: 'bold',
  },
});

export default Login;