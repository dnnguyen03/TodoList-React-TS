import { Modal } from "antd"
import { collection, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase/config"
import { Todo } from "./TodoList"
interface ModalAddProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setListTodo: React.Dispatch<React.SetStateAction<Todo[]>>
  listTodo: Todo[]
}
export default function ModalAdd({
  openModal,
  setOpenModal,
  setListTodo,
  listTodo,
}: ModalAddProps) {
  const [valueInput, setValueInput] = useState("")
  const handleOk = () => {
    if (valueInput.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        name: valueInput.trim(),
        completed: false,
      }
      const usersRef = doc(collection(db, "data"), "NHyiI2dN93r9xBXwQQm1")
      updateDoc(usersRef, {
        listAnime: [...listTodo, newTodo],
      })
      setListTodo((prev) => [...prev, newTodo])
      setValueInput("")
      setOpenModal(false)
    }
  }
  const handleCancel = () => {
    setOpenModal(false)
    setValueInput("")
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
  }

  return (
    <Modal
      title="Thêm anime"
      open={openModal}
      okButtonProps={{ style: { backgroundColor: "#068FFF" } }}
      onOk={handleOk}
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
  )
}
