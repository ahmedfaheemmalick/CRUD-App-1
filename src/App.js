import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [input, setInput] = useState("");

  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    fetch("/.netlify/functions/data/data")
      .then((res) => res.json())
      .then(({ data }) => setTodos(data));
  }, [todo]);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("/.netlify/functions/add/add", {
      method: "POST",
      body: JSON.stringify({ todoName: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setInput("");
      });
  };

  const handleDelete = (id) => {
    fetch("/.netlify/functions/delete/delete", {
      method: "DELETE",
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => setTodo(data));
  };

  const handleUpdate = (todo) => {
    setShowUpdate(true)
    setInput(todo.data.todoName);
    fetch("/.netlify/functions/update/update", {
      method: "PUT",
      body: JSON.stringify({
        id: todo.ref["@ref"].id,
        newTodo: input,
      }),
    })
      .then((res) => res.json())
      .then((data) => setTodo(data));
  };

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {showUpdate ? (
          <div>
            <input
              type="text"
              placeholder="Update Todo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => handleUpdate(todo)}>Update Todo</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Add Todo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add Todo</button>
          </div>
        )}
      </div>
      {todos?.map((todo, index) => (
        <div key={index}>
          <div>{todo.data.todoName}</div>
          <div>
            <button onClick={() => handleDelete(todo.ref["@ref"].id)}>
              Delete
            </button>
            <button onClick={() => handleUpdate(todo)}>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
