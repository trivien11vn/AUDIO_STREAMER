import { useState } from "react";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [value, setValue] = useState('')
  const [todo, setTodo] = useState([])
  
  const handleAdd = () => {
    if(todo?.some(item => item.id === value.replace(/\s+/g, ''))){
      toast.warn('The task was already added')
    }
    else{
      setTodo(prev => [...prev, {
        id: value.replace(/\s+/g, ''),
        job: value
      }])
      setValue('')
    }
  }

  const handleDeleteJob = (id) => {
    setTodo(prev => prev.filter(item => item.id !== id))
  }
  console.log(todo)
  return (
    <>
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
          {todo?.map((item) => (
            <li key={item?.id} className="flex gap-4 items-center">
              <span className="my-2">{item?.job}</span>
              <span className="my-2 text-xs cursor-pointer p-2" onClick={() => handleDeleteJob(item?.id)}>❌</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
    
  );
}

export default App;
