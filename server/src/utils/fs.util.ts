import * as fs from 'fs';

const copy = (originFile: string, destinationFile: string) => {
  return new Promise((resolve, reject) => {
    fs.copyFile(originFile, destinationFile, (err) => {
      if (err) {
        console.log({ err });
        reject(err);
      }
      resolve(null);
    });
  });
};

export { copy };
