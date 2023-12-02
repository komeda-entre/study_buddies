import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import './SendResetMail.css';
import InputForm from "components/module/inputForm/InputForm";
import FlashMessage from "components/module/FlashMessage/FlashMessage";
import { sendResetEmail } from "lib/api/auth";


const SendResetMail: React.FC = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submitError, setSubmitError] = useState("");

    const navigate= useNavigate();

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const generateParams = () => {
        const sendResetMailParams = {
            email: email,
            redirect_url: 'http://localhost:4000/signin',
        };
        return sendResetMailParams;
    };
    const handleSendResetMail =  async (e: FormEvent) => {
        e.preventDefault();
        const params = generateParams();
        const { email } = params;
        let errors: string[] = [];
        setEmailError("")
        setSubmitError("")

        if (!email) {
            setEmailError("メールアドレスを入力してください")
            errors.push('メールアドレスを記入してください');
        }
        if (errors.length > 0) {
            console.error(errors.join(' '));
            return;
        }
        try{
            const res = await sendResetEmail(params);
            console.log(res)
            setIsSubmitted(true)
        } catch (e) {
            setSubmitError("登録されていないメールアドレスの可能性があります")
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
                        <h1>パスワードを忘れた方</h1>
                        <p>StudyBuddiesにご登録されたメールアドレスを入力してください。<br/>パスワード再設定のご案内が送信されます。</p>
                        <div className="email_form">
                            <InputForm
                                labelName="メールアドレス"
                                name="email"
                                value={email}
                                onChange={setEmail}
                                errorMessage={emailError}
                            />
                        </div>
                        <FlashMessage
                            errorMessage={submitError}
                        />
                        <button type="submit" onClick={(e) => handleSendResetMail(e)} className="resetPassButton" >
                            パスワードをリセットする
                        </button>
                    </form>
                </div>
            </div>
            {isSubmitted && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{email}にメールを送信しました</p>
                        <button onClick={closeModal} className="modal-button">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SendResetMail
