/*時間割画面コントローラー*/

import { getRegisteredLessons } from "../model/registeredLessonsModel.mjs";

//登録済み授業一覧get
export function getRLessonsTimetable(req,res){
    //トークン確認
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "ログインしてください"}); //※returnを忘れないように！
    }

    //登録済み授業一覧をmodelから受け取り、フロントに返す
    const getRLessonsData = getRegisteredLessons();
    res.json(getRLessonsData);
}