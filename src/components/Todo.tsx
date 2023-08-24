import { Edit, Trash2 } from "react-feather"
import ModalEdit from "./ModalEdit"
import ModalDelete from "./ModalDelete"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { Todo as todo } from "./TodoList"
interface TodoProps {
  item: todo
  setListTodo: React.Dispatch<React.SetStateAction<todo[]>>
  listTodo: todo[]
}
export default function Todo({ item, setListTodo, listTodo }: TodoProps) {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleToggleState = () => {
    const updatedListTodo = listTodo.map((todo) =>
      todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
    )
    setListTodo(updatedListTodo)

    const todoRef = doc(db, "data", "NHyiI2dN93r9xBXwQQm1")
    updateDoc(todoRef, {
      listAnime: updatedListTodo,
    })
    // .then(() => {
    //   // console.log("Cập nhật tài liệu thành công!")
    // })
    // .catch((error) => {
    //   // console.error("Lỗi khi cập nhật tài liệu: ", error)
    // })
  }

  return (
    <div>
      <li
        className={`group flex items-center  cursor-pointer gap-3 p-3 rounded-lg border-2 ${
          item.completed ? "border-[#00A86b]" : ""
        }`}
      >
        <span
          className={`rounded-full border h-6 w-6 ${
            item.completed ? "bg-[#00A86b]" : "border-purple-800"
          }`}
          onClick={handleToggleState}
        >
          <div className="grid place-content-center">
            <i
              className={`fa-solid fa-check mt-1 text-white ${
                item.completed ? "block" : "hidden"
              }`}
            ></i>
          </div>
        </span>
        <div
          className={`select-none text-lg ${
            item.completed ? "text-[#828282] line-through" : "text-black"
          }`}
          onClick={handleToggleState}
        >
          {item.name}
        </div>
        <div className="hidden group-hover:flex gap-3 ml-auto">
          <button onClick={() => setOpenEditModal(true)}>
            <Edit size={18} />
          </button>
          <button onClick={() => setOpenDeleteModal(true)}>
            <Trash2 size={18} />
          </button>
        </div>
      </li>
      <ModalEdit
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        setListTodo={setListTodo}
        listTodo={listTodo}
        item={item}
      />
      <ModalDelete
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        setListTodo={setListTodo}
        listTodo={listTodo}
        item={item}
      />
    </div>
  )
}
