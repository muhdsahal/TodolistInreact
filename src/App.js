import './app.css'
import { useState } from 'react';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const dayofWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayName = dayofWeek[today.getDay()];

  function addTodo() {
    const Duplicate = toDos.some((obj) => obj.text === toDo);
    if (Duplicate) {
      alert("already exists!");
      return;
    }
    if (toDo.trim()) {
      setTodos([...toDos, { id: Date.now(), text: toDo.trim(), status: false }]);
      setTodo('');
    } else {
      alert('empty value!');
    }
  }

  function editToDo(todoId) {
    setEditingTodo(todoId);
    const todoToEdit = toDos.find((todo) => todo.id === todoId);
    if (todoToEdit) {
      setTodo(todoToEdit.text);
    }
  }

  function updateTodo() {
    const updatedTodos = toDos.map((todoItem) =>
      todoItem.id === editingTodo ? { ...todoItem, text: toDo.trim() } : todoItem
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
    setTodo('');
  }

  function handleCheckboxChange(todoId) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, status: !todo.status } : todo
      )
    );
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {dayName} 🌝 ☕</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        {editingTodo ? (
          <i onClick={updateTodo} className="fas fa-plus"></i>
        ) : (
          <i onClick={addTodo} className="fas fa-plus"></i>
        )}
      </div>

      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={() => handleCheckboxChange(obj.id)}
                value={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => editToDo(obj.id)} className="fas fa-pen"></i>
              <i
                onClick={() =>
                  setTodos(toDos.filter((obj2) => obj2.id !== obj.id))
                }
                className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
        <h4 style={{ color: 'red', marginTop: '20px' }}>active status</h4>
        {toDos.map((obj) => {
          if (obj.status) {
            return (
              <div className="input" key={obj.id}>
                <input value={obj.text} type="text" />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
