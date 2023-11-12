import React, { FormEvent, useContext } from 'react';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from 'lib/api/auth';
import { User } from 'interfaces';

interface HeaderProps {
    isSignedIn: boolean;
    currentUser: User | undefined;
}

const Header: React.FC<HeaderProps> = ({ isSignedIn, currentUser }) => {
    const history = useHistory();

    const handleSignOutSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await signOut();
            console.log(res);
            history.push("/signin");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <header className="header">
            <div className="company-name-div">
                <Link to="/" className="company-name"><h1>Study<br />Buddies</h1></Link>
            </div>
            <div className="nav-section">
                <nav>
                    <ul>
                        <Link to="/tasks" className="tasklist link">課題一覧</Link>
                        <Link to="#" className="helperlist link">お助け人一覧</Link>
                    </ul>
                </nav>
            </div>
            <div className="config_section">
                {isSignedIn && currentUser ? (
                    <div>
                        <Link to="/mypage" className="mypage">マイページ</Link>
                        <Link to="#" onClick={(e) => handleSignOutSubmit(e)} className="logout">ログアウト</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/signin" className="signin button">ログイン</Link>
                        <Link to="/signup" className="signup button">会員登録</Link>
                    </div>
                )}                
            </div>
        </header>
    );
};

export default Header;
