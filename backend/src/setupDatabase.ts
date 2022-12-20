import mongoose from "mongoose";
import Logger from "bunyan";
import { config } from "./config";

const log: Logger = config.createLogger("setupDatabase");

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info("!!! db 연결 성공");
      })
      .catch((err) => {
        log.info("!!! Error: " + err);
        return process.exit(1); // 즉시 종료
      });
  };
  connect();

  // 연결 해제(disconnect) 될 경우 다시 connect함수를 실행
  mongoose.connection.on("disconnect", connect);
};
