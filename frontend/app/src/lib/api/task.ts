import client from "lib/api/client"
import Cookies from "js-cookie"

import { TaskParams } from "interfaces/index"

// 課題一覧取得
export const getTasks = () => {
    return client.get("/tasks")
}

// 課題作成
export const createTask = (params: TaskParams) => {
    return client.post("tasks", params,{
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    })
}
