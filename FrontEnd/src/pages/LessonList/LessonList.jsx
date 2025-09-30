import { useEffect, useState } from 'react';
import './LessonList.css';

function LessonList({user}) { //授業一覧と登録済み一覧のstate  //registeredLessonはpropsに頼らない
    const [Lessons, setLessons] =useState([]);                     //授業一覧
    const [registeredLessons,setRegisteredLessons] = useState([]);  //登録済み授業  //←追加(propsから戻す)※App.jsxからも削除
    const [message, setMessage] = useState('');                  //メッセージ表示
    const [registeredMessage, setRegisteredMessage] = useState('') //登録済みメッセージ表示


    useEffect(() =>{ //初回だけ実行(授業一覧をまず表示)
        const fetchLessons = async() =>{  
            try{
                const response = await fetch('http://localhost:3000/api/lessons/get'); //ただ受け取るだけならシンプルGETでいい！(デフォルトでGETになる)
                const data = await response.json();
                setLessons(data);
            }catch(error){
                console.error('通信エラー',error);
            }
        }
        const fetchRegisteredLessons = async() =>{   //←追加  登録済み授業一覧の最初の取得もする(別ページに行っても表示されるように)
            try{
                const response = await fetch('http://localhost:3000/api/lessons/register/get',{
                    headers: { Authorization: `bearer ${user.token}` }
                }); 
                const data = await response.json();
                setRegisteredLessons(data);
            }catch(error){
                console.error('通信エラー',error);
            }
        }
        fetchLessons();            //授業一覧取得
        fetchRegisteredLessons();  // 登録済み授業一覧取得
    },[])  //一回だけ実行！

    const handleRegisterClick = async(lessonId) =>{ //登録ボタンを押した時の処理  ※ここの引数はボタンのID(変数) 個別化

        //API送信の処理 
        try{  
            const response = await fetch('http://localhost:3000/api/lessons/register/post',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,  //tokenを持っている人が権限を持つからheaderでuser.tokenをバックに渡す
                },                   //Bearerは「トークンを持ってる人が権限を持っている」っていう規格上のお約束 ※無くても動くけど基本だから慣れると良き
                body: JSON.stringify({
                    id: lessonId,  //idを送る
                })
            })
            const data = await response.json() // ←追加
            if(response.ok){
                //登録処理
                console.log('登録成功');
                setRegisteredLessons([...registeredLessons, data.lesson])
                setRegisteredMessage({...message, [lessonId]: data.message});  //メッセージ個別化
                setMessage({...message,[lessonId]:''}) //メッセージ表示を消す
            }else{
                console.log('登録失敗:',data.message);
                setMessage({...message, [lessonId]: data.message});
                return;   //処理を止める
            }
        }catch(error){
            console.error("通信エラー",error)
            return;
        }
    }

    const handleUnregisterClick = async(lessonId) => { //登録解除ボタンの処理
        
        try{
            const response = await fetch(`http://localhost:3000/api/lessons/register/delete/${lessonId}`,{   //IDを渡すために最後に${lessonId}にする(/:idで受け取る)※DELETEはbodyがないから
                method: 'DELETE',  //GETとDELETEはbodyが不要(Content-Typeも不要)
                headers: {
                    Authorization: `bearer ${user.token}`//bearerの後にスペース必須
                }
            });
            const data = await response.json(); //←追加

            if(response.ok){
                const afterRegisteredLessons = registeredLessons.filter(rLesson => rLesson.id !== data.lesson.id) // ←追加
                setRegisteredLessons(afterRegisteredLessons)  //←変更
                setRegisteredMessage({...message,[lessonId]: data.message})  //メッセージ個別化
                console.log('登録解除成功')
            }else{
                setRegisteredMessage({...message,[lessonId]: data.message})
                return;
            }
        }catch(error){
            console.error('通信エラー:',error);
            setRegisteredMessage('通信エラー');  //←変更 通信エラーにする
            return;
        }
    }

    return(
        <div className='lesson-container'>
            {/* 授業一覧 */}
            <div className="lessons">
                <h2>授業一覧</h2>
                <ul className='lesson-list'>
                    {Lessons.map((lesson) => ( //ここが()だとreturnを省略できる
                        <li key={lesson.id} className='lesson-item'>
                            {lesson.name}({lesson.day}曜/{lesson.period}限);
                            <button 
                                onClick={() => handleRegisterClick(lesson.id)}
                                disabled={registeredLessons.some((registered) => registered.id === lesson.id)}
                            >
                                {registeredLessons.some((registered) => registered.id === lesson.id) 
                                    ? '登録済み'
                                    : '登録'
                                }
                            </button>
                            <p>{message[lesson.id]}</p>  {/*lesson.idで個別化*/}
                        </li>
                    ))}
                </ul>
            </div>
            {/* 登録済み授業一覧 */}
            <div className="registered-lessons">
            <h3>登録済み授業</h3>
                <ul className='registered-lesson'>
                    {registeredLessons.map((lesson) => (
                        <li key={lesson.id} className='lesson-item'>
                            {lesson.name}({lesson.day}曜/{lesson.period}限);
                            <button onClick={() => handleUnregisterClick(lesson.id)}>登録解除</button>
                            <p>{registeredMessage[lesson.id]}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}



export default LessonList;