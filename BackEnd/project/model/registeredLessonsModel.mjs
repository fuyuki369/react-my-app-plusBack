/*登録済み授業一覧データベース(仮)*/

let registeredLessons = [  //constだと変更できないから、letにしておく
    //最初は空っぽ
]


//登録済み授業の取得
export function getRegisteredLessons() {
    return registeredLessons;  
}


//授業登録
export function addRegisteredLessons(aLesson) {//cLessonを引数でもってくる(confirmedLessonを引数として持ってくる) ※/*引数*/としておくのもあり
    registeredLessons.push(aLesson);
    return registeredLessons; //結果を伝える(※確認できるように)
}


//登録解除
export function deleteRegisteredLessons(dLessonId){
    registeredLessons = registeredLessons.filter(rLesson => rLesson.id !== dLessonId);
    return registeredLessons;//結果を伝える(忘れないように！)
}