import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") || '' : '';

    if (token) {
      // Fetch the API if the token exists
      const fetchData = async () => {
        const res = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        // Handle the fetched data
      };
      fetchData();
    } else {
      // Redirect if the token does not exist
      router.push('/login'); // Redirect to login page
    }
  }, [router]);

  return (
    <div>
      <h1>Your Profile</h1>
      {/* Render profile data here */}
    </div>
  );
}