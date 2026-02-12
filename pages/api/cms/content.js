import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'text.json');

function isAuthenticated(req) {
  const cookies = parse(req.headers.cookie || '');
  const session = cookies.cms_session;

  if (!session) return false;

  try {
    const decoded = Buffer.from(session, 'base64').toString('utf8');
    const [username] = decoded.split(':');
    return username === process.env.CMS_USERNAME;
  } catch {
    return false;
  }
}

function readData() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(content);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const data = readData();
      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      const { section, content } = req.body;
      const data = readData();

      if (!data[section]) {
        return res.status(404).json({ error: 'Section not found' });
      }

      data[section] = content;
      writeData(data);

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Content API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
