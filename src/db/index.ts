import fs from 'fs';
import path from 'path';

class DB {
  constructor(private path: string) { }

  public async readFrom(key: string) {
    const dbSet: any = await this.readDB() || {};

    if (!dbSet || !dbSet.hasOwnProperty(key)) {
      throw new Error(`>> The ${key} not found in the DataBase`);
    }

    return dbSet[key];
  }

  public async writeTo(key: string, value: any) {
    const data = await this.readFrom(key) as object;
    this.writeDB({ ...data, [key]: value });
  }

  private writeDB(payload: object) {
    return new Promise((resolve) => {
      fs.writeFile(path.join(__dirname, this.path), JSON.stringify(payload), 'utf8', () => resolve());
    });
  }

  private readDB() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, this.path), 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        let dbSet;
        try {
          dbSet = JSON.parse(data);
        } catch (e) {
          reject(e);
          return;
        }

        resolve(dbSet);
      });
    });
  }
}

export default new DB('./db.json');
