/*ログインコントローラー*/

import { postUsers } from "../model/userModel.mjs";

export function loginUsers(req,res){
    const {email,password} = req.body;
    const usersData = postUsers()
    //emailとpasswordが一致する学生をloginStudentにする(.map系の処理で一人一人に焦点を当てる)
    const loggedUser = usersData.find(user => user.email === email && user.password === password)
    //一致した学生(loggedUser)がない場合エラーを出す
    if(!loggedUser){
        return res.status(401).json({message: "IDまたはパスワードが違います"});
    }
    //問題なければ成功(フロントの頼み通りidとnameとtokenも渡す)
    res.status(200).json({
        message: "ログイン成功",
        id: loggedUser.id,
        name: loggedUser.name,
        token: loggedUser.token,
    })
}