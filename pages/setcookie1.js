import { useState } from 'react';

export default function SetToken() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the token to the API route to set the cookie
    const res = await fetch('/api/set-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }), // Pass token to the API
    });

    const data = await res.json();
    setMessage(data.message); // Display the response message
  };

  return (
    <div>
      <h1>Set Token</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)} // Update token value
        />
        <button type="submit">Set Cookie</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}