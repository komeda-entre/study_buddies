import React, { useContext } from "react";

import { AuthContext } from "App";

const Home: React.FC = () => {
    const { isSignedIn, currentUser } = useContext(AuthContext);

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

export default Home;
