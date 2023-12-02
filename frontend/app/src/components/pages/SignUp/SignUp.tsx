import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { signUp } from "lib/api/auth";
import InputForm from "components/module/inputForm/InputForm";
import './SignUp.css';
import FlashMessage from "components/module/FlashMessage/FlashMessage";
import Cookies from "js-cookie";

const SignUp: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const confirmSuccessUrl = "http://localhost:4000/confirmation";
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [passconfError, setPassConfError] = useState("");
    const [submitError, setSubmitError] = useState("");

    const generateParams = () => {
        const signUpParams = {
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
            confirmSuccessUrl: confirmSuccessUrl,
        };
        return signUpParams;
    };

    const handleSignUpSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const params = generateParams();
        const { email, password, passwordConfirmation } = params;
        let errors: string[] = [];
        setEmailError("")
        setSubmitError("")
        setPassError("")
        setPassConfError("")


        if (!email) {
            setEmailError("メールアドレスを入力してください")
            errors.push('メールアドレスを記入してください');
        }
        if (!password) {
            setPassError("パスワードを入力してください")
            errors.push('パスワードを入力してください');
        }
        if (!passwordConfirmation) {
            setPassConfError("パスワード確認を入力してください")
            errors.push('パスワード確認を入力してください');
        }
        if (password !== passwordConfirmation) {
            setSubmitError("パスワード確認には同じパスワードを入力してください")
            errors.push('パスワード確認には同じパスワードを入力してください');
        }
        if (errors.length > 0) {
            console.error(errors.join(' '));
            return;
        }
        try {
            const res = await signUp(params);
            console.log(res);
            if (res.status === 200) {
                Cookies.set("_access_token", res.headers["access-token"]);
                Cookies.set("_client", res.headers["client"]);
                Cookies.set("_uid", res.headers["uid"]);
            }
            alert("confirm email");
        } catch (e) {
            setSubmitError("会員登録ができませんでした")
            console.log(e);
        }
    };
    return (
        <>
            <div className="signup_body">
                <div className="signup_content">
                    <form className="signup_form">
                        <h1>会員登録</h1>
                        <div className="signup_email_form">
                            <InputForm
                                labelName="メールアドレス"
                                name="email"
                                value={email}
                                onChange={setEmail}
                                errorMessage={emailError}
                            />
                        </div>
                        <div className="signup_password_form">
                            <InputForm
                                labelName="パスワード"
                                name="password"
                                value={password}
                                onChange={setPassword}
                                errorMessage={passError}
                                type='password'
                            />
                        </div>
                        <div className="signup_password_conf_form">
                            <InputForm
                                labelName="パスワード確認"
                                name="passwordConfirmation"
                                type="password"
                                value={passwordConfirmation}
                                errorMessage={passconfError}
                                onChange={setPasswordConfirmation}
                            />
                        </div>
                        <div>
                            <input
                                type="hidden"
                                id="confirm_success_url"
                                name="confirm_success_url"
                                value={confirmSuccessUrl}
                            />
                        </div>
                        <FlashMessage
                            errorMessage={submitError}
                        />
                        <button type="submit" onClick={(e) => handleSignUpSubmit(e)} className="signinButton">
                            登録
                        </button>
                    </form>
                    <div className="have_account">
                        <p>アカウントをお持ちの方　　<Link to="/signin">ログイン</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp
