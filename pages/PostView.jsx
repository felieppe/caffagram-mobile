import { fetchAllProfiles, fetchFeed, fetchProfileById } from "@/utils/api";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileButton from "../components/EditProfileButton";
import BottomHeader from "../components/BottomHeader";
import PhotoGallery from "../components/PhotoGallery";
import TopHeaderProfile from "@/components/TopHeaderProfile";
import EditProfilePage from "../components/EditProfilePage";
import { useEffect, useState } from "react";

function User({ user = {}, jwt = "" }) {
    const [isEditing, setIsEditing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isOp, setIsOp] = useState(false);
    const [lUser, setLUser] = useState(null);

    const handleEditProfile = () => setIsEditing(true);
    const handleCancelEdit = () => setIsEditing(false);

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
        setIsEditing(false);
    };

    useEffect(() => {
        fetchFeed(jwt)
            .then((feed) => {
                const up = feed
                    .filter((post) => post.user.username === user.username)
                    .map((post) => ({
                        imageUrl: "http://localhost:3001/" + post.imageUrl,
                        id: post._id,
                    }));
                setPosts(up);
            })
            .catch((error) => console.error(error));

        const localUser = JSON.parse(localStorage.getItem("user"));
        setLUser(localUser);

        if (localUser == null) {
            setIsOp(false);
        } else if (localUser.username === user.username) {
            setIsOp(true);
        }
    }, [user, jwt]);

    if (!lUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div
                style={{
                    padding: "10px",
                    maxWidth: "480px",
                    margin: "0 auto",
                    fontFamily: "Arial, sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                {isEditing ? (
                    <EditProfilePage
                        profileData={user}
                        onSave={handleSaveProfile}
                        onCancel={handleCancelEdit}
                    />
                ) : null}

                <TopHeaderProfile />

                <ProfileHeader
                    username={user.username}
                    profilePicture={
                        user.profilePicture
                            ? user.profilePicture
                            : "/default-profile.webp"
                    }
                    posts={posts.length}
                    friends={user.friends.length}
                    description={user.description}
                    onEdit={handleEditProfile}
                />

                {isOp && (
                    <EditProfileButton
                        onEdit={handleEditProfile}
                        style={{
                            margin: "0 auto",
                            width: "80%",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontSize: "14px",
                        }}
                    />
                )}

                {posts.length > 0 ? (
                    <PhotoGallery photos={posts} />
                ) : (
                    <p
                        style={{
                            width: "100%",
                            textAlign: "center",
                            color: "#808080",
                            marginTop: "16px",
                        }}
                    >
                        No posts yet
                    </p>
                )}

                <BottomHeader
                    profileImageUrl={
                        fetchProfileById(lUser.id, jwt).profilePicture || ""
                    }
                />
            </div>
        </>
    );
}

export default User;

export async function getServerSideProps(context) {
    const { username } = context.query;
    if (!username) {
        return {
            redirect: { destination: "/feed", permanent: false },
        };
    }

    const jwt = context.req.cookies.token;
    if (!jwt) {
        return {
            redirect: { destination: "/Login", permanent: false },
        };
    }

    const user = await fetchAllProfiles(jwt).then((profiles) =>
        profiles.find((profile) => profile.username === username)
    );
    if (!user) {
        return {
            redirect: { destination: "/feed", permanent: false },
        };
    }

    return { props: { user, jwt } };
}
