import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

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

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ensure upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const form = formidable({
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filter: ({ mimetype }) => {
      // Only allow images
      return mimetype && mimetype.includes('image');
    },
  });

  try {
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Generate a clean filename
    const timestamp = Date.now();
    const originalName = file.originalFilename || 'upload';
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, '-');
    const newFileName = `${baseName}-${timestamp}${ext}`;
    const newPath = path.join(UPLOAD_DIR, newFileName);

    // Rename the temp file to the final name
    fs.renameSync(file.filepath, newPath);

    // Return the public path
    const publicPath = `/uploads/${newFileName}`;

    return res.status(200).json({
      success: true,
      path: publicPath,
      filename: newFileName,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
