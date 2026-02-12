import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const validUsername = process.env.CMS_USERNAME;
  const validPassword = process.env.CMS_PASSWORD;

  if (!validUsername || !validPassword) {
    return res.status(500).json({ error: 'CMS credentials not configured' });
  }

  if (username === validUsername && password === validPassword) {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    res.setHeader('Set-Cookie', serialize('cms_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    }));

    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
