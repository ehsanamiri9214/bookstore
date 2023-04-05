import * as XLSX from 'xlsx';

const readExcel = async (
  filePath: string,
  sheet?: string,
): Promise<{ sheet: string; items: [] }[]> => {
  return new Promise((resolve, reject) => {
    let data = [];

    const workbook = XLSX.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;

    if (sheet) {
      const isSheetValid = sheet_name_list.indexOf(sheet) !== -1;
      if (!isSheetValid) return reject('Sheet not found.');

      const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      data = [...data, { sheet, items: xlData }];
    } else {
      for (const sheet of sheet_name_list) {
        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        data = [...data, { sheet, items: xlData }];
      }
    }

    resolve(data);
  });
};

const writeExcel = async (
  filaPath: string,
  data: { sheet: string; items: object[] }[],
): Promise<void> => {
  const wb = XLSX.utils.book_new();
  for (const x of data) {
    const ws = XLSX.utils.json_to_sheet(x.items);
    XLSX.utils.book_append_sheet(wb, ws, x.sheet);
  }
  XLSX.writeFile(wb, filaPath);
};

export { readExcel, writeExcel };
