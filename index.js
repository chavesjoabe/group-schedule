import { readFileSync, writeFileSync } from 'node:fs';
import XLSX from 'xlsx';

const filename = 'schedule.xlsx';

const buffer = readFileSync(filename);

const worksheet = XLSX.read(buffer, {cellDates: true});
const sheetName = worksheet.SheetNames[0];

const sheet = worksheet.Sheets[sheetName];

const items = XLSX.utils.sheet_to_json(sheet, {
  blankrows: false,
  defval: '',
  rawNumbers: true,
  raw: false,
});

writeFileSync('out.json', JSON.stringify(items));


