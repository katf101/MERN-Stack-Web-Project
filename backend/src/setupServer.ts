import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
} from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cookierSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";

const SERVER_PORT = 5000;

export class MyChatServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routerMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookierSession({
        name: "session",
        keys: ["test1", "test2"],
        maxAge: 24 * 7 * 3600000, // 쿠키의 최대 기간 7일로 설정
        secure: false,
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        // origin: "https://dev.chatapp.com",
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: "50mb" })); // 요청마다 50mb를 넘기면 오류 발생
    app.use(urlencoded({ extended: true, limit: "50mb" }));
  }

  private routerMiddleware(app: Application): void {}

  private globalErrorHandler(app: Application): void {}

  // 인스턴스 전달
  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      // httpServer호출 후 전달
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }

  private createSocketIO(httpServer: http.Server): void {}

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  }
}
