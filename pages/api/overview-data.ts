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

  // Extract only the required columns for the overview page
  const chartData = jsonData.map((row: any) => ({
    date: row['date'], // Assuming there's a date column
    sales: row['salesUnits'],
    wtd: row['wtdNSA'],
  }));

  res.status(200).json(chartData);
}