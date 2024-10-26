import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbPath = path.join(process.cwd(), 'db.json');
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  res.status(200).json(dbData);
}
