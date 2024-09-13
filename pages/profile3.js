import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [token, setToken1] = useState('');
  
  useEffect(() => {
   // const token = typeof window !== 'undefined' ? localStorage.getItem("token") || '' : '';
   const fetchToken = async () => {
    const res = await fetch('/api/get-cookie');
    const data = await res.json();
    const data1 = data.json
    setToken1(data.token || 'No token found');
    //const token = data.token
  };

  fetchToken();


    if (token) {
      // Fetch the API if the token exists
      const fetchData = async () => {
        const res2 = await fetch('/api/get-cookie');
    const data3 = await res2.json();
    
    const data1 = data3.json
    console.log(data3.token)
        const res = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data1.token && data1.token.length < 10) {
          // Handle case where token is less than 10 characters
          console.log('token is too short')
         
          console.error('Token is too short');
          setTimeout(() => {
            router.push('/login'); // Redirect to login page after 3 seconds
          }, 3000);
        } else {
          // Handle the fetched data
        }
      };
      fetchData();
    } else {
      // Redirect if the token does not exist
      setTimeout(() => {
        router.push('/login'); // Redirect to login page after 3 seconds
      }, 3000);
    }
  }, [router]);

  return (
    <div>
      <h1>Your Profile</h1>
      {/* Render profile data here */}
    </div>
  );
}