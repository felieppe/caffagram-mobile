import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://your-api-url/api/register', {
        name,
        email,
        password,
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigation.navigate('Home'); 
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError('Hubo un error en el registro, por favor intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>¡Registro exitoso!</Text>}

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Registrar" onPress={handleRegister} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};
export default Register;