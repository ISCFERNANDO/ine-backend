import * as mysql from "mysql2";
import { Pool, QueryError } from "mysql2";
import { Service } from "@tsed/common";
import { DB } from "../../settings";

interface CustomPool extends Pool {
  promise(): { query: (query: string, data?: any) => Promise<any> };
}

@Service()
export class DatabaseService {
  private pool: CustomPool;
  private promisePool: any;

  constructor() {
    this.pool = <CustomPool>mysql.createPool({
      host: DB.MYSQL.HOST,
      user: DB.MYSQL.USERNAME,
      password: DB.MYSQL.PASSWORD,
      port: DB.MYSQL.PORT,
      database: DB.MYSQL.DATABASE,
    });
    this.promisePool = this.pool.promise();
  }

  async query(query: string, data?: any): Promise<any> {
    try {
      return await this.promisePool.query(query, data).then(([rows]) => {
        let resultSet = rows.length > 1 ? rows.slice(0, rows.length - 1) : [];
        if(resultSet.length === 1){
          return resultSet[0];
        } else {
          return resultSet;
        }
      });
    } catch (err) {
      console.log(err);
      throw <QueryError>err;
    }
  }
}
