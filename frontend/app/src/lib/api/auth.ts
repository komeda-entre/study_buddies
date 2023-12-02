import client from "lib/api/client"
import Cookies from "js-cookie"

import { SignUpParams, SignInParams, SendResetMailParams, PasswordResetParams, UserConfirmationParams } from "interfaces/index"

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
    return client.post("auth", params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
    return client.post("auth/sign_in", params)
}

// サインアウト（ログアウト）
export const signOut = () => {
    return client.delete("auth/sign_out", {
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    })
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
    return client.get("/auth/sessions", {
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    })
}

// パスワード再設定メール送信関数
export const sendResetEmail = (params: SendResetMailParams) => {
    return client.post("auth/password", params)
}

// パスワード再設定実行関数
export const onPasswordReset = (params: PasswordResetParams) => {
    console.log(params)
    return client.put("auth/password", params)
}

// ユーザーメール認証
export const userConfirmation = (params: UserConfirmationParams) => {
    console.log(params);

    if (params.confirmationToken) {
        const queryParams = new URLSearchParams({
            'confirmation_token': params.confirmationToken
        }).toString();

        return client.get(`auth/confirmation?${queryParams}`);
    } else {
        throw new Error('確認トークンが提供されていません');
    }
}
