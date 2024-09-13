import React from 'react';
import User from "../../layouts/User";

// ... existing code ...
//const token = localStorage.getItem("token") || ''; // Fallback to an empty string if token is not found
// ... existing code ...
// Sample user data (you can fetch this from an API in a real scenario)
//console.log(token)
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'A passionate developer who loves working with JavaScript and React.',
  profilePicture: 'https://via.placeholder.com/150',
};

const Profile = () => {
  return (
    <div style={styles.container}>
      <h1>Profile Page</h1>
      <div style={styles.profileCard}>
        <img
          src={user.profilePicture}
          alt="Profile Picture"
          style={styles.profileImage}
        />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

// Basic inline styling (you can replace this with a CSS or a styled-component)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  profileCard: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
  },
  profileImage: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '20px',
  },
};

export default Profile.layout = User;