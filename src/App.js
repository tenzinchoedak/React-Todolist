import React, { useState, useEffect } from "react";
import './App.css';
import Form from "./componets/Form";
import TodoList from "./componets/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
 
 //only run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);   
  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }
    
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>What's the plan for today?</h1>
      </header>
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} status={status} setStatus={setStatus}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
