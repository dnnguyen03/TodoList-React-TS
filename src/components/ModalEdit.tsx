import { useState } from "react"
import { Modal } from "antd"
import { Todo } from "./TodoList"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"
interface ModalEditProps {
  item: Todo
  openModal: boolean
  setOpenModal: (open: boolean) => void
  setListTodo: React.Dispatch<React.SetStateAction<Todo[]>>
  listTodo: Todo[]
}
export default function ModalEdit({
  item,
  openModal,
  setOpenModal,
  setListTodo,
  listTodo,
}: ModalEditProps) {
  const [valueInput, setValueInput] = useState(item.name)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
  }
  const handleOke = () => {
    if (valueInput.trim() !== "") {
      const updatedListTodo = listTodo.map((todo) =>
        todo.id === item.id ? { ...todo, name: valueInput } : todo
      )
      setListTodo(updatedListTodo)
      const todoRef = doc(db, "data", "NHyiI2dN93r9xBXwQQm1")
      updateDoc(todoRef, {
        listAnime: updatedListTodo,
      })
      setOpenModal(false)
    }
  }
  const handleCancel = () => {
    setOpenModal(false)
  }
  return (
    <>
      <Modal
        title="Sửa tên anime"
        open={openModal}
        okButtonProps={{ style: { backgroundColor: "#068FFF" } }}
        onOk={handleOke}
        onCancel={handleCancel}
      >
        <input
          value={valueInput}
          type="text"
          placeholder="Name anime"
          onChange={handleInput}
          className="w-full focus-visible:outline-none border-x border-y border-gray-400 rounded-lg px-2 py-1 focus:border-[#068FFF]"
        />
      </Modal>
    </>
  )
}
