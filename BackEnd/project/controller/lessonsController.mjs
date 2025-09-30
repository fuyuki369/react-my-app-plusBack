/*授業一覧コントローラー*/

import { getLessons } from "../model/lessonsModel.mjs";
import { getRegisteredLessons,addRegisteredLessons,deleteRegisteredLessons } from "../model/registeredLessonsModel.mjs";

//授業一覧を渡す
export function getAllLesson(req,res) {
    const LessonsData = getLessons();
    res.json(LessonsData);
}

//登録済み授業一覧を渡す
export function getAllRegisteredLesson(req,res) {
    const registeredLessonData = getRegisteredLessons()
    res.json(registeredLessonData);
}

//授業登録の処理
export function postLessonRegistration(req,res) {
    const { id } = req.body;
    const ID = Number(id);   //←追加  数列にしないと読み込めない
    const token = req.headers.authorization?.split(" ")[1];  //.split(" ")で配列に、[1]で二つ目の要素を受け取る(?は、前の値がnullやundefinedじゃないなら処理を進めるって意味)
    const lessonListData = getLessons(); //授業データ取得
    const registeredLessonsData = getRegisteredLessons(); //登録済みデータ取得

    const addLesson = lessonListData.find(lessonData => lessonData.id === ID); //追加する授業を探す ※先に単体にする意識
    //1.ログイン確認
    if(!token){
        return res.status(401).json({message: "ログインしてください"}) ;   //※returnを忘れずに！
    }
    //2.授業存在確認
    if(!addLesson){
        return res.status(404).json({message: "授業が確認できません"});//「データが確認できない」から(404)
    }
    //3.開講期間チェック
    const today = new Date().toISOString().split('T')[0];
    if(today < addLesson.startDate || today > addLesson.endDate) {  //単体意識(registeredLessonsDataだと複数形でエラーになる)
        return res.status(400).json({message: "開講期間外です"});
    }
    //4.登録済み確認
    const alreadyRegistered = registeredLessonsData.some(rData => rData.id === ID)
    if (alreadyRegistered){
        return res.status(400).json({message: "既に登録されています"})
    }
    //5.重複確認
    const isConflict = registeredLessonsData.some(rData =>  //ここはフロントでやったようにすればいい(+単体意識)
        rData.day === addLesson.day && rData.period === addLesson.period   //授業一覧の中で指定されたデータと登録済み一覧のデータの比較
    )
    if(isConflict){
        return res.status(400).json({message: "時限が重複しています"})
    }

    //追加実行
    addRegisteredLessons(addLesson); //addRegisteredLessonsに処理を任せる(引数としてaddLessonを送る)
    //追加確認レスポンス
    res.status(201).json({message: "授業登録完了" ,lesson: addLesson}); //どの授業が登録されたかわかるようにすると丁寧
}


//登録解除の処理
export function deleteLessonsRegistration(req,res) {
    const {id} = req.params  //paramsからURLのidを受け取る
    const ID = Number(id);   //←追加  数列にしないと読み込めない
    const token = req.headers.authorization?.split(" ")[1]; //トークンを受け取る※忘れずに！※headerではなくheadersなことを意識
    const registeredLessonsData = getRegisteredLessons(); //登録済み授業を受け取る

    //ログイン確認
    if(!token){
        res.status(401).json({message: "ログインしてください"});
    }

    //削除対象の存在確認
    const deleteLesson = registeredLessonsData.find(rData => rData.id === ID);  //単体にするときはメモ分けしたほうがいいかも

    //削除対象が存在しない場合の処理
    if (!deleteLesson){
        res.status(404).json({message: "授業が確認できません"}); //「データが確認できない」から(404)
    }

    //削除実行
    deleteRegisteredLessons(deleteLesson.id);  //deleteLesson.idを渡すこと意識
    //削除確認レスポンス
    res.status(200).json({message: "登録解除しました", lesson: deleteLesson});
}

