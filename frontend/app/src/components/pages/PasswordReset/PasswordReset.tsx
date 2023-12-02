import { useState, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import './PasswordReset.css';
import InputForm from "components/module/inputForm/InputForm";
import FlashMessage from "components/module/FlashMessage/FlashMessage";
import { onPasswordReset } from "lib/api/auth";


const PasswordReset: React.FC = () => {
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [passconfError, setPassConfError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [searchParams] = useSearchParams();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const navigate= useNavigate();

    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const resetPasswordToken = searchParams.get('reset_password_token')

    const generateParams = () => {
        const passwordResetParams = {
            password: password,
            passwordConfirmation: passwordConfirmation,
            resetPasswordToken: resetPasswordToken,
        };
        return passwordResetParams;
    };
    const handlePasswordReset = async (e: FormEvent) => {
        e.preventDefault();
        const params = generateParams();
        const { password, passwordConfirmation } = params;
        let errors: string[] = [];
        setPassConfError("")
        setSubmitError("")
        setPassError("")
        if (!password) {
            setPassError("パスワードを入力してください")
            errors.push('パスワードを入力してください');
        } 
        if (!passwordConfirmation) {
            setPassConfError("パスワード確認を入力してください")
            errors.push('パスワード確認を入力してください');
        }
        if (password !== passwordConfirmation){
            setSubmitError("パスワード確認には同じパスワードを入力してください")
            errors.push('パスワード確認には同じパスワードを入力してください');
        }
        if (errors.length > 0) {
            console.error(errors.join(' '));
            return;
        }
        try {
            const res = await onPasswordReset(params);
            console.log(res)
            setIsSubmitted(true)
        } catch (e) {
            setSubmitError("パスワードの再設定が拒否されました")
            console.log(e)
        }

    }
    const closeModal = () => {
        setIsSubmitted(false);
        navigate('/signin');
    };

    return (
        <>
            <div className="resetpass_body">
                <div className="resetpass_content">
                    <form className="resetpass_form">
                        <h1>パスワード再設定</h1>
                        <p>新しいパスワードを入力してください</p>
                        {resetPasswordToken ? (
                            <>
                                <div className="reset_password_form">
                                    <InputForm
                                        labelName="パスワード"
                                        name="password"
                                        value={password}
                                        type="password"
                                        onChange={setPassword}
                                        errorMessage={passError}
                                    />
                                </div>
                                <div className="reset_password_form">
                                    <InputForm
                                        labelName="パスワード確認"
                                        name="passwordConfirmation"
                                        type = "password"
                                        value={passwordConfirmation}
                                        errorMessage={passconfError}
                                        onChange={setPasswordConfirmation}
                                    />
                                </div>
                                <FlashMessage
                                    errorMessage={submitError}
                                />
                                <button type="submit" onClick={(e) => handlePasswordReset(e)} className="resetPassButton" >
                                    変更
                                </button>
                            </>
                        ) : null}
                    </form>
                </div>
            </div>
            {isSubmitted && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>パスワードの再設定が完了しました</p>
                        <button onClick={closeModal} className="modal-button">
                            ログイン画面に戻る
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PasswordReset
