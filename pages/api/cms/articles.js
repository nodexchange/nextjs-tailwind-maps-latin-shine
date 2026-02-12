import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'articles.json');

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

    if (req.method === 'POST') {
      const { article } = req.body;
      const data = readData();

      const maxId = data.articles.reduce((max, a) => Math.max(max, a.id || 0), 0);
      article.id = maxId + 1;

      data.articles.unshift(article);
      writeData(data);

      return res.status(200).json({ success: true, id: article.id });
    }

    if (req.method === 'PUT') {
      const { article } = req.body;
      const data = readData();

      const index = data.articles.findIndex(a => a.id === article.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Article not found' });
      }

      data.articles[index] = article;
      writeData(data);

      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const data = readData();

      const index = data.articles.findIndex(a => a.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Article not found' });
      }

      data.articles.splice(index, 1);
      writeData(data);

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Articles API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
