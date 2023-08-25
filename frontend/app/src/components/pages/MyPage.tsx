import React, { FormEvent, useContext } from "react";

import { AuthContext } from "App";
import { signOut } from "lib/api/auth";
import { useHistory } from "react-router-dom";

const MyPage: React.FC = () => {
    const { isSignedIn, currentUser } = useContext(AuthContext);
    const history = useHistory();

    const handleSignInSubmit = async (e: FormEvent) => {
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
        <div>
            {isSignedIn && currentUser ? (
                <div>
                    <h1>Signed in successfully!</h1>
                    <h2>Email: {currentUser?.email}</h2>
                    <h2>Name: {currentUser?.name}</h2>
                    {currentUser?.admin && <h2>Admin: 管理者です</h2>}
                </div>
            ) : (
                <h1>Not signed in</h1>
            )}
        </div>
    );
};

export default MyPage;
