// pages/set-cookie.js
export default function SetCookie() {
    const setCookie = async () => {
      const res = await fetch('/api/set-cookie');
      const data = await res.json();
      console.log(data.message); // "Cookie set successfully!"
    };
  
    return (
      <div>
        <h1>Set Cookie</h1>
        <button onClick={setCookie}>Set Cookie via API</button>
      </div>
    );
  }