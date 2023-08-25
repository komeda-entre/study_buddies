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
                <Link to="/" className="company-name"><h1>StudyBuddies</h1></Link>
            </div>
            <div className="nav-section">
                <nav>
                    {isSignedIn && currentUser ? (
                        <ul>
                            <Link to="/mypage" className="mypage">マイページ</Link>
                            <Link to="#" onClick={(e) => handleSignOutSubmit(e)} className="logout">ログアウト</Link>
                        </ul>
                    ) : (
                        <ul>
                            <Link to="/signin" className="signin">ログイン</Link>
                            <Link to="/signup" className="signup">会員登録</Link>
                        </ul>
                    )}                
                </nav>
            </div>
        </header>
    );
};

export default Header;
