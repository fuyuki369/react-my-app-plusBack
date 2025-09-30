/*ルーター*/
import express from 'express';

import { loginUsers } from "../controller/userController.mjs";
import { getAllLesson,getAllRegisteredLesson,postLessonRegistration,deleteLessonsRegistration } from '../controller/lessonsController.mjs';
import { getRLessonsTimetable } from '../controller/timetableController.mjs';
import { postSyllabusSearch } from '../controller/syllabusController.mjs';


const router = express.Router();

router.post("/login",loginUsers);  //分かりやすいように/loginにしておく
router.get("/get",getAllLesson);   //ここのパスはAPIのURLの最後のほうを指定する(この段階で決める)※index.mjs+routesで指定したpathになる
router.get("/register/get",getAllRegisteredLesson)  //分かりやすいように/getとしておく
router.post("/register/post",postLessonRegistration); //(授業登録の処理に/:idは必要？)     
router.delete("/register/delete/:id",deleteLessonsRegistration) //フロントの${lessonId}からIDを受け取れるようにする
router.get("/timetable", getRLessonsTimetable)  //時間割画面
router.post("/search",postSyllabusSearch)  //シラバス検索画面

export default router;