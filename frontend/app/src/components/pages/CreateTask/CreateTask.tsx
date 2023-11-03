import React, { FormEvent, useContext, useState } from "react";

import { AuthContext } from "App";
import { Redirect, useHistory } from "react-router-dom";
import { createTask } from "lib/api/task";

const CreateTask: React.FC = () => {
    const { isSignedIn, currentUser } = useContext(AuthContext);
    const history = useHistory();
    const [title, setTitle] = useState("");

    const generateParams = () => {
        const TaskParams = {
            title: title,
        };
        return TaskParams;
    };

    const handleCreateTaskSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const params = generateParams();
        if (isSignedIn) {
            try {
                const res = await createTask(params);
                console.log(res)
                if (res.status === 201) {
                    console.log("201ok")
                    history.push("/");
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            return <Redirect to="/signin" />;
        }
    };
    return (
        <div>
            <p>課題登録</p>
            <form>
                <div>
                    <label htmlFor="email">科目名</label>
                    <input
                        type="title"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={(e) => handleCreateTaskSubmit(e)}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateTask;
