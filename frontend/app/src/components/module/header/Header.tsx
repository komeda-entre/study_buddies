import React, { FormEvent, useContext } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'lib/api/auth';
import { User } from 'interfaces';

interface HeaderProps {
    isSignedIn: boolean;
    currentUser: User | undefined;
}

const Header: React.FC<HeaderProps> = ({ isSignedIn, currentUser }) => {
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

    return (
        <header className="header">
            <div className="company-name-div">
                <Link to="/" className="company-name"><h1>🔳 Irace</h1></Link>
            </div>
            <div className="nav-section">
                <nav>
                    <ul>
                        <Link to="/tasks" className="tasklist link">Competition</Link>
                    </ul>
                </nav>
            </div>
            <div className="config_section">
                {isSignedIn && currentUser ? (
                    <div>
                        <Link to="/profile" className="mypage">プロフィール</Link>
                        <Link to="#" onClick={(e) => handleSignOutSubmit(e)} className="logout">ログアウト</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/signup" className="signup">会員登録</Link>
                        <Link to="/signin" className="signin">ログイン</Link>
                        <Link to="/signup_corp" className="corp_login">企業の方はこちら</Link>
                    </div>
                )}                
            </div>
        </header>
    );
};

export default Header;
