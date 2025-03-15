import { AppDataSource } from "@/config/database";
import { DataSource } from "typeorm";
import { logger } from "./logger";

let datasource: DataSource;
let initializationPromise: Promise<DataSource> | null = null;

export async function initializeDatabase() {
  if (initializationPromise) {
    return initializationPromise;
  }

  if (!datasource) {
    datasource = AppDataSource;
  }

  if (!datasource.isInitialized) {
    initializationPromise = (async () => {
      try {
        await datasource.initialize();
        logger.info("Database initialized");
        return datasource;
      } catch (error) {
        // 如果已经初始化，忽略错误
        if (!datasource.isInitialized) {
          initializationPromise = null; // 重置Promise以便下次尝试
          throw error;
        }
        return datasource;
      }
    })();

    return initializationPromise;
  }

  return datasource;
}
