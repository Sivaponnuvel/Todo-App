import { useState } from "react";

function Todo(){
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);
    
    const handleSubmit = () => {
        if (!task.trim()) return;

        if (editId){
            setTasks(
                tasks.map((item) =>
                    item.id === editId ? {...item, text: task}: item
                )
            );
            setEditId(null);
        } else{
            const newTask = {
                id: Date.now(),
                text: task,
                completed: false,
            };
            setTasks([...tasks, newTask]);
        }
        setTask("");
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((item) => item.id !== id));
        if (editId === id){
            setEditId(null);
            setTask("");
        }
    };

    const editTask = (taskObj) => {
        setTask(taskObj.text);
        setEditId(taskObj.id);
    };

    const toggleComplete = (id) => {
        setTasks(
            tasks.map((item) =>
                item.id === id ? {...item,  completed: !item.completed } : item
            )
        );
    };

    return(
        <div className="container">
            <h1>📝 Todo Manager</h1>

            <div className="input-section">
                <input
                 type="text"
                 placeholder="Enter Task"
                 value={task}
                 onChange={(e)=> setTask(e.target.value)}
                 onKeyDown={(e)=>{if (e.key === "Enter") handleSubmit();}}
                />
                <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
            </div>

            <div className="stats">
                <p>Total Tasks: {tasks.length}</p>
                <p>Completed: {tasks.filter((item) => item.completed).length}</p>
            </div>

            {tasks.length > 0 && (
                <button className="clear-btn" onClick={() => setTasks([])}>
                    🗑 Clear All
                </button>
            )}

            <ul>
                {tasks.length === 0 &&(
                    <p className="empty-msg">No tasks yet — add one above!</p>
                )}

                {tasks.map((item) => (
                    <li key={item.id}>
                        <span className={item.completed ? "completed" : ""} onClick={() => toggleComplete(item.id)}>
                            {item.completed ? "✅" : "⬜"} {item.text}
                        </span>

                        <div>
                            <button className="edit-btn" onClick={() => editTask(item)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => deleteTask(item.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Todo;