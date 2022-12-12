import express, { Express } from "express";

import { MyChatServer } from "./setupServer";

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: MyChatServer = new MyChatServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
