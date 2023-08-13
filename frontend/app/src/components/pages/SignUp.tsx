import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { signUp } from "lib/api/auth";

const SignUp: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const confirmSuccessUrl = "http://localhost:4000";

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
        try {
            const res = await signUp(params);
            console.log(res);
            alert("confirm email");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <h1>サインアップページです</h1>
            <form>
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password_confirmation">パスワード確認</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                <button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
                    Submit
                </button>
            </form>
            <Link to="/signin">サインインへ</Link>
        </>
    );
};

export default SignUp
