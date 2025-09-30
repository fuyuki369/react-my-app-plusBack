/*ログイン認証データベース(仮)*/

let users = [   //複数ならuserをusersにしておく。
    {id: 1,name: "生徒くん", email:"student@example.com",password: "password",token: "dummy-token-101"},
    {id: 2,name: "学生さん", email:"gakusei@example.com",password: "password",token: "dummy-token-102"},
]

//ユーザーのデータを渡す
export function postUsers(){  //一つか複数かの意識大事
    return users;  
}