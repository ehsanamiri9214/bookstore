import { ExcelBook } from 'src/types';

type ExcelSheet = {
  sheet: string;
  items: ExcelBook[];
};

export { ExcelSheet };
