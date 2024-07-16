import { useState } from "react";

function App() {
  const [value, setValue] = useState('')
  const [todo, setTodo] = useState([])
  
  const handleAdd = () => {
    setTodo(prev => [...prev, value])
    setValue('')
  }
  console.log(todo)
  return (
    <div className="flex flex-col items-center justify-center border-2 border-red-400 h-screen gap-2">
      <div className="flex gap-2">
      <input 
        type="text" 
        className="outline-none border border-green-500 px-4 py-2 w-[400px]" // 1 ~ 0.25rem , 1rem ~ 16px
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />
      <button 
        type="button"
        className="outline-none px-4 py-2 bg-blue-500 text-white border rounded-md" 
        onClick={handleAdd}
      >
        Add
      </button>
      </div>
      <div>
        <h3 className="font-bold text-xl">Content</h3>
        <ul>
          {todo?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
