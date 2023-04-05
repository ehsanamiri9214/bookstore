import * as fs from 'fs';

const downloadAndSaveFile = async (url: string, path: string) => {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  try {
    fs.writeFile(path, Buffer.from(buffer), {}, (err) => {
      if (err) throw err;
      return;
    });
  } catch (error) {
    console.log('Writing to file failed.');
  }
};

export { downloadAndSaveFile };
