const convertNumbersToEnglish = (text: string): string => {
  return text
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
};

const convertNumbersToPersian = (text: string): string => {
  const persianNumbers: string[] = [
    '۰',
    '۱',
    '۲',
    '۳',
    '۴',
    '۵',
    '۶',
    '۷',
    '۸',
    '۹',
  ];

  return text
    .toString()
    .split('')
    .map((x) => persianNumbers[x])
    .join('');
};

export { convertNumbersToEnglish, convertNumbersToPersian };
