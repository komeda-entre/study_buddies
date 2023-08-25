import React, { FormEvent, useContext } from "react";

import { AuthContext } from "App";
import { signOut } from "lib/api/auth";
import { useHistory } from "react-router-dom";
import aura from 'images/aura.png'

const Home: React.FC = () => {
    const { isSignedIn, currentUser } = useContext(AuthContext);
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
    console.log(isSignedIn)
    console.log(currentUser)
    return (
        <div>
            <div className="main">
                <img src={aura} className="main-image" alt="image" />
            </div>
            {isSignedIn && currentUser ? (
                <div>
                    <h1>Signed in successfully!</h1>
                    <h2>Email: {currentUser?.email}</h2>
                    <h2>Name: {currentUser?.name}</h2>
                    {currentUser?.admin && <h2>Admin: 管理者です</h2>}
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
