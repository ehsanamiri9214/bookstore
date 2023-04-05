import { Parser } from '@json2csv/plainjs';

const jsonToCsv = (data) => {
  try {
    const opts = {};
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    return csv;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { jsonToCsv };
