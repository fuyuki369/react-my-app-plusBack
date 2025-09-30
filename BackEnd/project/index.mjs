/*サーバーエントリーポイント*/

import express from "express";
import cors from "cors";   // ← 追加  //npm install cors

import studentRoutes from "./routes/studentRoutes.mjs";

const app = express();
const PORT = 3000;

app.use(cors({  //  ← 追加
    origin: "http://localhost:5173",  // フロントのURL  なんでこのURLになっちゃうの？
    credentials: true, // 必要ならクッキーや認証情報も送れるようにする
}));

app.use(express.json());
app.use("/api/lessons",studentRoutes);  //  APIのURLだとわかるように/api/lessonsにしておく

/*サーバー起動*/
app.listen(PORT, () => {
    console.log(`サーバー起動: http://localhost:${PORT}`); //ここlocalhost:にする (:を意識)
})