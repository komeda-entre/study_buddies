import React, { FormEvent, useContext } from "react";
import './Profile.css';

import { AuthContext } from "App";
import { signOut } from "lib/api/auth";
import { Link, useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    const { isSignedIn, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <h1>a</h1>
            {isSignedIn && currentUser ? (
                <div>
                    <h1>Signed in successfully!</h1>
                    <img src={currentUser?.image?.url} alt="説明テキスト" className="responsive-image" />
                    <h2>Name: {currentUser?.name}</h2>
                    <h2>University: {currentUser?.university}</h2>
                    {currentUser?.admin && <h2>Admin: 管理者です</h2>}
                </div>
            ) : (
                <h1>Not signed in</h1>
            )}
        </div>
    );
};

export default Profile;
