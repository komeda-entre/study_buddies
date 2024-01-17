// サインアップ
export interface SignUpParams {
    name: string
    university: string | null;
    email: string
    password: string
    passwordConfirmation: string
    corporation: boolean
}

// サインイン
export interface SignInParams {
    email: string
    password: string
}

// ユーザー
export interface User {
    university: string;
    id: number
    uid: string
    provider: string
    email: string
    name: string
    nickname?: string
    image?: {
        url: string
    }
    allowPasswordChange: boolean
    created_at: Date
    updated_at: Date
    admin: boolean
}
//Userアップデート
export interface UserUpdateParams {
    id: number
    email: string
    name: string
    image?: {
        url: string
    }
    university: string
    password: string
    passwordConfirmation: string
}
// 課題作成
export interface TaskParams {
    title: string
}

export interface SendResetMailParams {
    email: string
    redirect_url?: string
}
export interface PasswordResetParams {
    password: string
    passwordConfirmation: string
    resetPasswordToken?: string | null;
}
export interface UserConfirmationParams {
    confirmationToken?: string | null;
}
