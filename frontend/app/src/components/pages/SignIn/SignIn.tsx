import Cookies from "js-cookie";
import { useContext, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "lib/api/auth";
import { AuthContext } from "App";
import './SignIn.css';
import InputForm from "components/module/inputForm/InputForm";
import FlashMessage from "components/module/FlashMessage/FlashMessage";


const SignIn: React.FC = () => {
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submitError, setSubmitError] = useState("");

    const navigate= useNavigate();

    const generateParams = () => {
        const signInParams = {
            email: email,
            password: password,
        };
        return signInParams;
    };

    const handleSignInSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const params = generateParams();
        const { email, password } = params;
        let errors: string[] = [];
        setEmailError("")
        setSubmitError("")
        setPassError("")

        if (!email) {
            setEmailError("メールアドレスを入力してください" )
            errors.push('メールアドレスを記入してください');
        }
        if (!password) {
            setPassError("パスワードを入力してください")
            errors.push('パスワードを入力してください');
        }
        if (errors.length > 0) {
            console.error(errors.join(' ')); 
            return;
        }
        

        try {
            const res = await signIn(params);
            if (res.status === 200) {
                Cookies.set("_access_token", res.headers["access-token"]);
                Cookies.set("_client", res.headers["client"]);
                Cookies.set("_uid", res.headers["uid"]);

                setIsSignedIn(true);
                setCurrentUser(res.data.data);

                navigate("/");
            }
        } catch (e) {
            setSubmitError("メールアドレスまたはパスワードが違います")
            console.log(e);
        }
    };
    return (
        <>
            <div className="signin_body">
                <div className="signin_content">
                    <form className="signin_form">
                        <h1>ログイン</h1>
                        <div className = "email_form">
                            <InputForm
                                labelName = "メールアドレス"
                                name= "email"
                                value  = {email}
                                onChange={setEmail}
                                errorMessage={emailError}
                            />
                        </div>
                        <div className="password_form">
                            <InputForm
                                labelName="パスワード"
                                name="password"
                                value={password}
                                onChange={setPassword}
                                errorMessage={passError}
                                type= 'password'
                            />
                            <Link to="/send_reset_mail" className="forget_password">パスワードを忘れた方はこちら</Link>
                        </div>
                        <FlashMessage
                            errorMessage={submitError}
                        />
                        <button type="submit" onClick={(e) => handleSignInSubmit(e)} className="signinButton" >
                            ログイン
                        </button>
                    </form>
                    <div className="not_account">
                        <p>アカウントをお持ちでない方　　<Link to="/signup">会員登録</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn
