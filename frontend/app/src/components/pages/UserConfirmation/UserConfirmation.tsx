import { useContext, useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { userConfirmation } from "lib/api/auth";
import Cookies from "js-cookie";
import { AuthContext } from "App";

const UserConfirmation: React.FC = () => {
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const confirmationToken = searchParams.get('confirmation_token')
    const [confirmFlag,setConfirmFlag] = useState(false)

    const generateParams = () => {
        const userConfirmationParams = {
            confirmationToken: confirmationToken,
        };
        return userConfirmationParams;
    };

    const handleUserConfirmation = async () => {
        if (confirmFlag) {
            return; 
        }
        const params = generateParams();
        setConfirmFlag(true)
        try {
            const res = await userConfirmation(params);
            console.log(res);
            if (res.status === 200) {
                Cookies.set("_access_token", res.headers["access-token"]);
                Cookies.set("_client", res.headers["client"]);
                Cookies.set("_uid", res.headers["uid"]);
                setIsSignedIn(true);
                setCurrentUser(res.data.data);
                navigate("/");
            }
        } catch (e) {
            navigate("/");
            console.log(e);
        }
    }
    useEffect(() => {
        handleUserConfirmation()
    }, [])

    return (
        <>
            <div className="signup_body">
               User認証中です
            </div>
        </>
    );
};

export default UserConfirmation
