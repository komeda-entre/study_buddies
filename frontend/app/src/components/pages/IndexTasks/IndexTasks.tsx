import React, { FormEvent, useEffect, useState } from "react";
import { getTasks } from "lib/api/task"
import { TaskParams } from "interfaces/index"


const IndexTask: React.FC = () => {
    const [tasks, setTasks] = useState<TaskParams[]>([])

    const handleGetTasks = async () => {
        try {
            const res = await getTasks()
            console.log(res)

            if (res?.status === 200) {
                setTasks(res.data.tasks)
                console.log(tasks)
            } else {
                console.log(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        handleGetTasks()
    }, [])

    return (
        <div>
            <tbody>
                {tasks ? (
                    tasks.map((task: TaskParams, index: number) => (
                        <tr key={index}>
                            <td>{task.title}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td>No tasks available</td>
                    </tr>
                )}
            </tbody>
        </div>
    );
};

export default IndexTask;
