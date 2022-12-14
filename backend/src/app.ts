import express, { Express } from "express";

import { MyChatServer } from "./setupServer";
import databaseConnection from "./setupDatabase";
import { config } from "./config";

class Application {
  public initialize(): void {
    // 앱 시작 시 loadConfig 호출 되고 데이터베이스 시작 -> Server 실행
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: MyChatServer = new MyChatServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
