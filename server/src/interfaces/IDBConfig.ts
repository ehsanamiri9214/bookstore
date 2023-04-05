interface IDBConfig {
  type: 'mysql';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  entities: [string];
  migrations: [string];
  synchronize: boolean;
  dropSchema: boolean;
  logging: boolean;
}

export default IDBConfig;
