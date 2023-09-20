import './app.css'
import { useState } from 'react';

function App() {
  const [toDos,setTodos]= useState([])
  const [toDo,setTodo]=useState('')
  const [editingTodo,setEditingTodo]= useState(null)
  const dayofWeek=[
    
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Fridayday",
    "Saturday",
  ]
  const today = new Date();
  // const dayofWeek = today.getDay()
  const dayName = dayofWeek[today.getDay()];


function addTodo(){
  const Duplicate = toDos.some((obj)=>obj.text === toDo);
  if (Duplicate){
    alert("already exist!")
    return;
  }
  if (toDo.trim()){
    setTodos([...toDos,{id:Date.now(),text:toDo.trim(),status:false}])
    setTodo("");
  }else{
    alert('empty value!')

  }
}
function editToDo(toDoId){
  setEditingTodo(toDoId)
  const todoToEdit = toDos.find((todo)=>todo.id===toDoId)
  if (todoToEdit){
    setTodo(todoToEdit.text)
  }
}

function updateTodo(){
  const updateTodos = toDos.map((todoitem)=>
  todoitem.id === editingTodo ? {...todoitem,text:toDo.trim()}:todoitem)
  setTodos(updateTodos)
  setEditingTodo(null)
  setTodo('')
}


 return(
  <div className="app">
  <div className="mainHeading">
    <h1>ToDo List</h1>
  </div>
  <div className="subHeading">
    <br />
    <h2>Whoop, it's {dayName} 🌝 ☕ </h2>
  </div>
  <div className="input">
    <input value={toDo} 
    onChange={(e)=>setTodo(e.target.value)}
     type="text" placeholder="🖊️ Add item..." />
    {editingTodo ?(
      <i onClick={updateTodo} className='fas fa-plus'></i>
    ):(
      <i onClick={addTodo} className='fas fa-plus'></i>
    )}
  </div>

  <div className="todos">
  { toDos.map((obj)=>{

    return ( <div className="todo">
      <div className="left">
        <input onChange={(e)=>{
          console.log(e.target.checked)
          console.log(obj);
          setTodos(toDos.filter(obj2=>{
            if(obj2.id===obj.id){
              obj2.status = e.target.checked
            }
            return obj2
          }))
        }} value={obj.status} type="checkbox" name="" id="" />
        <p>{obj.text}</p>
      </div>
      <div className="right">
      <i onClick={() => editToDo(obj.id)} className='fas fa-pen'></i>
        <i onClick={()=> {setTodos(toDos.filter((obj2)=>obj2.id !== obj.id))}}  className="fas fa-times"></i>
      </div>
    </div>)})}
    <h4 style={{color:'red',marginTop:'20px'}}>active status</h4>

    {toDos.map((obj)=>{
          if(obj.status){
            return (
              <div className="input" key={obj.id}>
                <input value={obj.text} type="text" />
              </div>
            );
          }
          return null
        })}
  </div>
</div>
 );
 
 
}


export default App