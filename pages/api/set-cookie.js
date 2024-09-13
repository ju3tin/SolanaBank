import cookie from 'cookie';

export default function handler(req, res) {
  const { token } = req.body; // Extract token from the request body

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  // Set the cookie with the token
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Secure in production
      maxAge: 60 * 60, // 1 hour
      sameSite: 'strict',
      path: '/',
    })
  );

  // Send a response back to the client
  res.status(200).json({ message: 'Cookie set successfully!' });
}