import { useState } from "react"
import TodoList from "./components/TodoList"
import Login from "./components/Login"

function App() {
  const [login, setLogin] = useState(false)
  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center">
      {login?<TodoList/>:<Login setLogin={setLogin}/>}
    </div>
  )
}

export default App
