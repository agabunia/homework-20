import { useState } from "react";

const Form = ({onFormSubmit}) => {
    const [task, setTask] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(task)
    }

    return (
        <form action="" onSubmit={onSubmit}>
            <input type="text" 
                   placeholder="Task" 
                   onChange={e => setTask(e.target.value)} 
            />

            <button type="submit">Submit</button>
        </form>
    )
}


export default Form;