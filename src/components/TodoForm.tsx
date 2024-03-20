import React, {Dispatch, SetStateAction, useState} from 'react';
import TodoService from '../TodoService';
import TodoTypes from '../todo';
interface PropTypes {
    setTodos: Dispatch<SetStateAction<TodoTypes[]>>
}
const TodoForm:React.FC<PropTypes> = ({setTodos}) => {
    const [newTodoText, setNewTodoText] = useState<string>("");
    const handleAddTodo = () =>{
        if(newTodoText.trim() !== null){
            const newTodo = TodoService.addTodo(newTodoText);
            setTodos(prev => [...prev, newTodo]);
            setNewTodoText("");
        }
    }
  return (
    <div className='inputForm'>
        <input type="text" value={newTodoText} onChange={(e)=> setNewTodoText(e.target.value)} autoFocus={true} placeholder='add a todo task'/>
        <button onClick={handleAddTodo}>Create Todo</button>
    </div>
  )
}

export default TodoForm