import React, { useState, useEffect } from 'react'
import "./Container.css"
import { v4 as uuidv4 } from 'uuid';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Container = () => {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const Add = () => {
        if (todo.trim() !== "") {
            setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
            setTodo("")
        }
    }

    const Edit = (indexToEdit) => {
        const edit = todos.filter((_, index) => index === indexToEdit);
        setTodo(edit[0].todo);
        const updatedNewItems = todos.filter((_, index) => index !== indexToEdit);
        setTodos(updatedNewItems);
    }

    const Delete = (indexToDelete) => {
        const updatedItems = todos.filter((_, index) => index !== indexToDelete);
        setTodos(updatedItems);
    }

    const change = (e) => {
        setTodo(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            Add();
        }
    };

    const checkbox = (e) => {
        let id = e.target.name;
        console.log(id)
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        console.log("index is", index)
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos)
    };

    const Empty = () => {
        if (window.confirm("Do you want to delete all todos?")) {
            setTodos([]);
        }
    }

    const ToggleFinish = (e) => {
        setFinish(!finish)
    }



    return (
        <div className='container'>
            <div className="box">
                <div className="task"> <h1>Add Your Todos</h1> </div>
                <div className="field">
                    <input className='input' type="text" placeholder='Enter Todos...' onChange={change} value={todo} onKeyPress={handleKeyPress} />
                    <button className='btn' onClick={Add}>Add</button>
                </div>
                <div className="Your-todos"> {todos.length > 0 ? <div className='your-todos-box'> <div className="Your-todo"><div><h1>Your Todos...</h1></div><div><button className="btn" id='btn' onClick={Empty}>Empty Todos</button></div></div> <div className='finish'><input type="checkbox" checked={finish} onChange={ToggleFinish} /> Show Finished </div> </div> : <div><h1>No Todos...</h1></div>}</div>
                <div className="todos">
                    {todos.map((item, index) => {
                        return (finish || !item.isCompleted) && <div key={item.id} className="todo">
                            <div className="first">
                                <input className='check' type="checkbox" checked={item.isCompleted} onChange={checkbox} name={item.id} />
                                <div className="todo-text"><div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div></div>
                            </div>
                            <div className="buttons">
                                <button className='btn' onClick={() => Edit(index)}><FaPen /></button>
                                <button className='btn' onClick={() => Delete(index)}><MdDelete /></button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Container