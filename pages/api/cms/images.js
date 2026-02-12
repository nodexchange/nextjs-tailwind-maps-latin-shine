import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

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

function getImagesFromDir(dir, prefix) {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

  return files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .map(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        path: `${prefix}/${file}`,
        size: stats.size,
        modified: stats.mtime,
      };
    })
    .sort((a, b) => new Date(b.modified) - new Date(a.modified));
}

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const uploadedImages = getImagesFromDir(UPLOADS_DIR, '/uploads');
    const existingImages = getImagesFromDir(IMAGES_DIR, '/images');

    return res.status(200).json({
      uploads: uploadedImages,
      images: existingImages,
    });
  } catch (error) {
    console.error('Images API error:', error);
    return res.status(500).json({ error: 'Failed to list images' });
  }
}
