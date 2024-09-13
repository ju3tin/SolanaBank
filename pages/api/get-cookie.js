export default function handler(req, res) {
    const { accessToken } = req.cookies; // Access the cookie
  
    if (accessToken) {
      res.status(200).json({ token: accessToken });
    } else {
      res.status(404).json({ message: 'Token not found' });
    }
  }