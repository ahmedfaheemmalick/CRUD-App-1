import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/.netlify/functions/add/add", {
      method: "POST",
      body: JSON.stringify({ todoName: "todo 1" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>Hello World</div>;
}

export default App;
