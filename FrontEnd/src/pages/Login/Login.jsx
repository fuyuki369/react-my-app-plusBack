import { useState } from 'react'
import { useNavigate } from 'react-router-dom';  //遷移する道具
import './login.css'

function Login({setUser}) {    
    const [email,setEmail] = useState('');  //メールアドレスstate
    const [password,setPassword] = useState('');  //パスワードstate
    const [loginResult,setLoginResult] = useState('');  //リザルトstate
    const navigate = useNavigate();  //navigate初期化

    const handleLogin = async(e) => {  //※emailとpasswordの引数を消したら、レスポンスが401がら200になった。
        e.preventDefault();

        try{
            const response = await fetch(`http://localhost:3000/api/lessons/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,         //ここはstateに任せていい
                    password: password,
                })
                
            });
            const data = await response.json(); 
            

            if(response.ok){   //レスポンスが200台であるかどうか               
                setLoginResult('ログイン成功!');
                console.log('トークン:',data.token); 
                setUser({ //サーバーが返すもの
                    id: data.id,
                    name: data.name,
                    token: data.token,
                })
                navigate('./lessons')  //遷移
            }else{
                setLoginResult(data.message);
            }
        } catch(error) {
        console.error('通信エラー',error)
        setLoginResult('通信エラーが発生しました。')
        }
    }

    return (
        <>
            <div className='login-container'>
                <form onSubmit={handleLogin}>
                    <h1>ログインフォーム</h1>
                    <hr />
                    <div className="uiForm">
                        <div className='formField'>
                            <label htmlFor="学籍番号">学籍番号 (→「student@example.com」)</label>
                            <input 
                                name='email'
                                type="email" 
                                placeholder='学籍番号(@example.com)'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="パスワード">パスワード (→「password」)</label>
                            <input
                                name='password'
                                type="password" 
                                placeholder='パスワード'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className='login-btn' type='submit'>ログイン</button>
                    </div>
                </form>
                <div className='not-login'><a href="./syllabus">ログインせずにシラバス検索へ →</a></div>
                <p>{loginResult}</p>
            </div>
        </>
    )
}

export default Login;
