import * as csv from 'csv-parser';
import * as fs from 'fs';
import { jsonToCsv } from 'src/utils';

const readCSV = async (filePath: string) => {
  const records = [];
  const parser = fs.createReadStream(filePath).pipe(csv());
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

const writeCSV = async (filePath: string, data: any) => {
  const toCsv = jsonToCsv(data);
  try {
    fs.writeFile(filePath, toCsv, {}, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log('Writing to file failed.');
  }
};

export { readCSV, writeCSV };
