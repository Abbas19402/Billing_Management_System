import bcrypt from 'bcrypt'; // For password hashing

const users = [
  { email: 'client@example.com', password: 'clientX123', role: 'client' }, // Hashed password
  { email: 'admin@example.com', password: 'admin123', role: 'admin' }, // Hashed password
];

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const foundUser = users.find((user) => user.email === email);

  if (!foundUser) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  try {
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const token = 'your_secure_token'; // Replace with actual token generation logic
      return res.status(200).json({ 
        success: true, 
        token, 
        role: foundUser.role 
     });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}