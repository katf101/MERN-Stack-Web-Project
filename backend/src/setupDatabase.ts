import mongoose from "mongoose";

export default () => {
  const connect = () => {
    mongoose
      .connect("mongodb://localhost:27017/mychatapp-backend")
      .then(() => {
        console.log("!!! db 연결 성공");
      })
      .catch((err) => {
        console.log("!!! Error: " + err);
        return process.exit(1); // 즉시 종료
      });
  };
  connect();

  // 연결 해제(disconnect) 될 경우 다시 connect함수를 실행
  mongoose.connection.on("disconnect", connect);
};
