import React, { useEffect } from 'react'
import './Todo.css'
import { useState, useRef } from 'react'
import { FcDeleteRow } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";



function Todo() {

    const [Todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId, setEditID] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')

    const addTodo = () => {
       if(Todo.trim() !== '' ){

        const isDuplicate = todos.some((item)=>item.list === Todo.trim())

        if(!isDuplicate){
        setTodos([...todos, { list: Todo, id: Date.now(), status: false }])
        console.log(todos)
        setTodo("")
        setErrorMessage("")
        }else{
            setErrorMessage('Duplicate todo. not added')
        }

       }
       if(editId){
        const editTodo = todos.find((todo)=>todo.id === editId)
        const updateTodo = todos.map((to)=>to.id=== editTodo.id
        ?(to = {id : to.id , list : Todo}) : (to = {id : to.id , list : to.list}))
        setTodos(updateTodo) 
        setEditID(0)
        setTodo('')
       }
    }

    const inputRef = useRef('null')
    useEffect(() => {
        inputRef.current.focus();
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onDelete = (id) => {
        setTodos(todos.filter((to) => to.id !== id))
    }

    const onComplete = (id) => {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return ({ ...list, status:!list.status })
            }
            return list
        })
        setTodos(complete)
    }

    const onEdit = (id)=>{
        const editTodo = todos.find((to)=> to.id ===id)
        setTodo(editTodo.list)
        setEditID(editTodo.id)
    }

    return (
        <div className='container'>
            <h2>Todo List</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form className='form-group' onSubmit={handleSubmit}>
                <input type='text' value={Todo} ref={inputRef} placeholder='Enter your todo list' className='form-control' onChange={(event) => setTodo(event.target.value)} />
                <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'} </button>
            </form>
            <div className='list'>
                <ul>
                    {
                        todos.map((to) => (
                            <li className='list-items'>
                                <div className='list-item-list' id={to.status ? 'list-item' : ''}>
                                    {to.list}
                                </div>
                                <span>
                                    <CiEdit className='list-items-icons' id='edit' title='edit' onClick={()=> onEdit(to.id)} />
                                    <FcDeleteRow className='list-items-icons' id='delete' title='delete' onClick={() => onDelete(to.id)} />
                                    <MdDoneAll className='list-items-icons' id='complete' title='complete' onClick={() => onComplete(to.id)} />
                                </span>
                            </li>
                        ))

                    }
                </ul>
            </div>
        </div>
    )

}

export default Todo