import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Home from "components/pages/Home/Home"
import SignUp from "components/pages/SignUp/SignUp"
import SignIn from "components/pages/SignIn/SignIn"
import MyPage from "components/pages/MyPage/MyPage"
import CreateTask from "components/pages/CreateTask/CreateTask"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"
import Header from "components/module/header/Header"
import IndexTasks from "components/pages/IndexTasks/IndexTasks"
import '@fortawesome/fontawesome-free/css/all.min.css';

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

        console.log(res?.data.data)
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
  const Private = ({ children }: { children: React.ReactNode }) => {
    if (!loading) {
      if (isSignedIn) {
        return <>{children}</>;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  }

  return (
    <Router>
      <Header 
        isSignedIn = {isSignedIn}
        currentUser = {currentUser} 
      />
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/" component={Home} />
          <Route exact path="/tasks" component={IndexTasks} />
          <Private>
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/create_task" component={CreateTask} />
          </Private>
        </Switch>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
