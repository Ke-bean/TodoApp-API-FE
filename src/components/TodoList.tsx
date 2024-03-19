import React, {useState} from 'react'
import TodoTypes from '../todo'
import TodoService from '../TodoService'

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editedTodoId, setEditedTodoId] = useState<number|null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>("");
    const handleEditStart = (id:number, text:string)=>{
        setEditedTodoId(id);
        setEditedTodoText(text);
    }
    const handleEditCancel = () =>{
        setEditedTodoId(null);
        setEditedTodoText("");
    }
    const handleEditTodoSave = (id: number) =>{
        
    }
  return (
    <div>

    </div>
  )
}

export default TodoList