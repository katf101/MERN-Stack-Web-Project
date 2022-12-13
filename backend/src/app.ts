import express, { Express } from "express";

import { MyChatServer } from "./setupServer";
import databaseConnection from "./setupDatabase";

class Application {
  public initialize(): void {
    databaseConnection();
    const app: Express = express();
    const server: MyChatServer = new MyChatServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
