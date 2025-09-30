//複数ページ型APP

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/Login/Login.jsx';
import LessonList from './pages/LessonList/LessonList.jsx';
import Timetable from './pages/Timetable/Timetable.jsx';
import SyllabusSearch from './pages/SyllabusSearch/SyllabusSearch.jsx';
import Layout from './pages/Layout/Layout.jsx';
import RequireAuth from './component/RequireAuth.jsx';

function App() {
    const [user,setUser] = useState(null);
    //registeredLessonsをpropsに頼らない状態にする

    return(
        <BrowserRouter>
            <Routes>
                {/*指定なしRoute(ログイン画面)*/}
                <Route path='/' element={<Login setUser={setUser} />} />

                {/*ログイン画面Route*/}
                <Route path='/login' element={<Login setUser={setUser} />} />  {/*パス(/)はここで決める*/}

                {/*各ページRoute*/}
                <Route element={<Layout user={user} />}>
                    {/*履修登録画面Route(ログイン必須)*/}
                    <Route 
                        path='/lessons' 
                        element={
                            <RequireAuth user={user}>
                                <LessonList
                                    user={user}
                                />
                            </RequireAuth>
                        } 
                    />
                    {/*時間割確認Route(ログイン必須)*/}
                    <Route 
                        path='/timetable' 
                        element={
                            <RequireAuth user={user}>
                                <Timetable
                                    user={user}
                                />
                            </RequireAuth>
                        } 
                    />
                    {/*シラバス検索Route*/}
                    <Route path='/syllabus' element={<SyllabusSearch/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;