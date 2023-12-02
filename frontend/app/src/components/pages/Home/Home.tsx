import React, { FormEvent, useContext } from "react";
import './Home.css';
import { AuthContext } from "App";
import { signOut } from "lib/api/auth";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const { isSignedIn, currentUser } = useContext(AuthContext);
    const navigate= useNavigate();

    const handleSignOutSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await signOut();
            console.log(res);
            navigate("/signin");
        } catch (e) {
            console.log(e);
        }
    };
    console.log(isSignedIn)
    console.log(currentUser)
    return (
        <div>
            <div className="main">
                <div className="main-image">
                    <div className="sub-title-frame">
                        <h1 className="sub-title">Study<br />Budddies</h1>
                        <p className="sub-sentence">課題からくるストレスを解決<br />&<br />あなたのスキルを誰かの手助けに</p>
                    </div>
                </div>
            </div>
            {isSignedIn && currentUser ? (
                <div>
                    <h1>Signed in successfully!</h1>
                    <h2>Email: {currentUser?.email}</h2>
                    <h2>Name: {currentUser?.name}</h2>
                    {currentUser?.admin && <h2>Admin: 管理者です</h2>}
                    <h1><Link to="/create_task" className="create_task_link">課題を作成する</Link></h1>

                    <button type="submit" onClick={(e) => handleSignOutSubmit(e)}>
                        ログアウト
                    </button>
                </div>
            ) : (
                <h1>Not signed in</h1>
            )}
        </div>
    );
};

export default Home;
