import { useState, useEffect } from "react"
import Filter from "./Filter"
import Todo from "./Todo"
import ModalAdd from "./ModalAdd"
import useFirestore from "../firebase/useFireStore"
export interface Todo {
  id: number
  name: string
  completed: boolean
}
export default function TodoList() {
  const [listTodo, setListTodo] = useState<Todo[]>([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [getInitData, setGetInitData] = useState(false)
  const [listDisplay, setListDisplay] = useState<Todo[]>(listTodo)
  const data = useFirestore("data")
  const [search, setSearch] = useState("")
  const [state, setState] = useState("All")
  useEffect(() => {
    if (data[0] && !getInitData) {
      setListTodo(data[0]?.listAnime || [])
      setGetInitData(true)
    }
  }, [data, getInitData])

  useEffect(() => {
    if (listTodo.length > 0) {
      const listFilter = listTodo.filter((todo) => {
        if (state === "All") {
          return todo.name.toLowerCase().includes(search.toLowerCase())
        }
        return (
          (state == "Complete" ? todo.completed : !todo.completed) &&
          todo.name.toLowerCase().includes(search.toLowerCase())
        )
      })
      setListDisplay(listFilter)
    }
  }, [listTodo, search, state])

  return (
    <div className="w-[60%]  bg-white p-2 rounded-xl">
      <Filter
        setOpenAddModal={setOpenAddModal}
        setSearch={setSearch}
        setState={setState}
      />
      <div className="mt-3 flex flex-col gap-2  h-[650px] overflow-y-auto">
        {listDisplay.map((todo) => (
          <Todo
            key={todo.id}
            item={todo}
            setListTodo={setListTodo}
            listTodo={listTodo}
          />
        ))}
      </div>
      <ModalAdd
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        setListTodo={setListTodo}
        listTodo={listTodo}
      />
    </div>
  )
}
