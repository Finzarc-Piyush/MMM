import * as XLSX from 'xlsx';

export const readExcelFile = async (filePath: string): Promise<any[][]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return jsonData;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
};