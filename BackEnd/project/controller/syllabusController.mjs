/*シラバスコントローラー*/

import { getSyllabus } from "../model/syllabusModel.mjs";

export function postSyllabusSearch(req,res) {
    const {semester,faculty,day,period,keyword} = req.body;
    const syllabusData = getSyllabus();

    //フィルタリング処理(消去法)
    const filteredSyllabusData = syllabusData.filter(sLesson => {  
        //学期(指定していてかつ該当しないものをfalseにする) //未指定はスキップ
        if (semester && sLesson.semester !== semester) return false;
        //学部
        if (faculty && !(sLesson.faculty.includes(faculty))) return false;  //facultyは配列になってるからincludesにする
        //曜日
        if (day && sLesson.day !== day) return false;
        //時限(型の違いをNumberで調整)
        if (period && Number(sLesson.period) !== Number(period)) return false;
        //キーワード(授業名か概要にkeywordが含まれている状態じゃない場合falseにする)
        if (keyword && !(sLesson.name.includes(keyword) || sLesson.summary.includes(keyword))) return false;

        return true;  //どれも大丈夫ならtrue
    })
    res.json(filteredSyllabusData);
}