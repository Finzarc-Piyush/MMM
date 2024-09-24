import { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.resolve('./Data/Input Data - Optix.xlsx');
  const fileBuffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  res.status(200).json(jsonData);
}