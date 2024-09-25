import { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.resolve('./Data/Elasticity Data.xlsx');
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    res.status(500).json({ error: 'Failed to read Excel file' });
  }
}