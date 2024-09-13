import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { data } from '@tensorflow/tfjs';


export default function CheckToken() {

  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch the token from the API route
    const fetchToken = async () => {
      const res = await fetch('/api/get-cookie');
      const data = await res.json();
   //   setToken(data.token || 'No token found');
     // console.log(data.token+ "sdfsdfsd")
      const dataaccesstoken = data.token;
      console.log(dataaccesstoken);
      const tokenString = String(data.token); // Ensure data.token is a string


      if (tokenString && tokenString.length < 10) {
        // Handle case where token is less than 10 characters
        console.error('Token is too short');
        setTimeout(() => {
          router.push('/login'); // Redirect to login page after 3 seconds
        }, 3000);
      } else {
        setToken(data.token || 'No token found');
      }
    };

    fetchToken();
  }, []);

  return (
    <div>
      <h1>Your Token</h1>
      <p>{token}</p>
    </div>
  );
}