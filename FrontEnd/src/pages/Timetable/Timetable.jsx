import { useEffect,useState } from "react";
import './Timetable.css';


function Timetable({user}){  //propsに頼らないやり方でやってみる
    //ログイン確認
    if(!user || !user.token){       //ログイン確認は一番上のほうがいい
        return <p className="login-message">ログインしてください</p>
    }

    const days = ['月','火','水','木','金']  //曜日表示
    const periods = [1,2,3,4,5]              //時限表示

    const [getRegisteredLessons,setGetRegisteredLessons] = useState([]);  //取得した登録済み授業一覧(※追加)
    const [displayType,setDisplayType] = useState('current')  //現在・過去切り替え
    const [clickedLesson,setClickedLesson] = useState(null)   //モーダル表示切り替え

    //※追加
    useEffect(() => {
        //API(登録済み授業一覧GET)
        const fetchTimetable = async () => {
            const response = await fetch('http://localhost:3000/api/lessons/timetable', {
                headers: {
                    "Authorization" : `bearer ${user.token}`, 
                }
            })
            const data = await response.json();
            setGetRegisteredLessons(data);
        }
        if (user?.token){
            fetchTimetable();
        }
    },[user])


    return(  /*filteredLessonをGETで受け取った値に置き換えればいい！*/
        <div className="timetable-container">
            {/*現在・過去切り替え*/}
            <div className="timetable-wrapper">
                <div className="timetable-tabs">
                    <button
                        className={displayType === 'current' ? 'active' : ''}
                        onClick={() => setDisplayType('current')} //() =>で、ボタンを押した時だけ実行
                    >
                        現在
                    </button>
                    <button
                        className={displayType === 'past' ? 'active' : ''}
                        onClick={() => setDisplayType('past')}
                    >
                        過去
                    </button>
                </div>
            </div>
            {/*時間割表*/}
            <table>
                {/*時間割表上部*/}
                <thead>
                    <tr>
                        <th></th>{/*左上空白*/}
                        {days.map((day) =>(
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                {/*時間割表中部*/}
                <tbody>
                    {periods.map((period) => (
                        <tr key={period}>
                            <th>{period}</th>
                            {days.map((day) =>{ //returnの前に処理書くから{}にする
                                const displayedLesson = getRegisteredLessons.find((fLesson) =>(
                                    fLesson.day === day && fLesson.period === period  
                                ))
                                return(
                                    <td 
                                        key={day + period}
                                        className="timetable-call" 
                                        onClick={() => displayedLesson && setClickedLesson(displayedLesson)}
                                    >
                                        {displayedLesson ? displayedLesson.name : ''}  {/*displayedLessonがあるときだけ授業名表示*/}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/*モーダル表示*/}
            {clickedLesson && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{clickedLesson.name}</h2>   
                        <p>曜日:{clickedLesson.day}</p>
                        <p>時限:{clickedLesson.period}</p>
                        <button onClick={() => setClickedLesson(null)}>閉じる</button>
                    </div>
                </div>
            )}
        </div>
    )
}



export default Timetable;