import React, {useState} from 'react'
import TodoTypes from '../todo'
import TodoService from '../TodoService'
import { FaCheck, FaEdit } from 'react-icons/fa';
import { GiCancel} from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import TodoForm from './TodoForm';

const TodoList: React.FC  = () => {
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
        if(editedTodoText.trim() !== ""){
          const updateTodo = TodoService.updateTodo({
            id,
            text: editedTodoText,
            completed: false
          });
          setTodos((prev=> prev.map(todo=> todo.id === id? updateTodo: todo)));
          setEditedTodoId(null);
          setEditedTodoText("");
        }
    }
    const handleDeleteTodo = (id:number) =>{
    TodoService.deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  return (
    <div className='todoContainer'>
      <div>
        <TodoForm setTodos = {setTodos}/>
      </div>
      <div className="todos">
        {todos.map(todo => (
          <div className="items" key={todo.id}>
            {editedTodoId == todo.id? (
              <div className="editedText">
                <input type="text" value={editedTodoText} onChange={e => setEditedTodoText(e.target.value)} autoFocus={true} />
                <button onClick={() => handleEditTodoSave(todo.id)}>
                  <FaCheck/>
                </button>
                <button className='cancelBtn' onClick={() => handleEditCancel()}>
                  <GiCancel />
                </button>
              </div>
            ):(
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={()=> handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList
