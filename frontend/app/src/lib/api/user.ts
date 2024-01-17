import client from "lib/api/client"
import Cookies from "js-cookie"
import { UserUpdateParams } from "interfaces/index"


// 課題一覧取得
export const updateUser = (params: UserUpdateParams) => {
    return client.put(`auth/users/${params.id}`, params, {
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    });
}
