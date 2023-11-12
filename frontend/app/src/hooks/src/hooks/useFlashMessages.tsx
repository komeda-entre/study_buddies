import { useState } from 'react';

// Flashメッセージの型を定義します。
interface FlashMessage {
    error: string;
}

function useFlashMessage() {
    // FlashMessageの代わりにstring型でerrorの状態を管理します。
    const [error, setErrors] = useState("");

    // FlashMessage型のオブジェクトを受け取る関数としてhandleFlashMessageを定義します。
    const handleFlashMessage = (message: FlashMessage) => {
        setErrors(message.error || "");
        // 2秒後にフラッシュメッセージをクリアします。
        setTimeout(() => setErrors(""), 2000);
    }

    return { error, handleFlashMessage }
}

export default useFlashMessage;
