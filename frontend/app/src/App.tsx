import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom"

import Home from "components/pages/Home/Home"
import SignIn from "components/pages/SignIn/SignIn"
import MyPage from "components/pages/MyPage/MyPage"
import CreateTask from "components/pages/CreateTask/CreateTask"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"
import Header from "components/module/header/Header"
import IndexTasks from "components/pages/IndexTasks/IndexTasks"
import '@fortawesome/fontawesome-free/css/all.min.css';
import SendResetMail from "components/pages/SendResetMail/SendResetMail"
import PasswordReset from "components/pages/PasswordReset/PasswordReset"
import SignUp from "components/pages/SignUp/SignUp"
import UserConfirmation from "components/pages/UserConfirmation/UserConfirmation"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) {
      return <></>; // ローディング中の表示（必要に応じて変更）
    }
    return isSignedIn ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Header
        isSignedIn={isSignedIn}
        currentUser={currentUser}
      />
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<IndexTasks />} />
          <Route path="/send_reset_mail" element={<SendResetMail />} />
          <Route path="/password" element={<PasswordReset />} />
          <Route path="/user_confirmation" element={<UserConfirmation />} />
          <Route path="/mypage" element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          } />
          <Route path="/create_task" element={
            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>
          } />
        </Routes>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
