import { Modal } from "antd"
import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"
interface Todo {
  id: number
  name: string
  completed: boolean
}
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
  const handleOke = () => {
    const updatedListTodo = listTodo.filter((todo) => todo.id !== item.id)
    setListTodo(updatedListTodo)
    const todoRef = doc(db, "data", "NHyiI2dN93r9xBXwQQm1")
    updateDoc(todoRef, {
      listAnime: updatedListTodo,
    })
  }
  const handleCancel = () => {
    setOpenModal(false)
  }
  return (
    <>
      <Modal
        title="Xóa anime"
        open={openModal}
        okButtonProps={{ style: { backgroundColor: "#ff0606" } }}
        onOk={handleOke}
        onCancel={handleCancel}
      >
        <h3>Bạn có chắc muốn xóa anime này không</h3>
      </Modal>
    </>
  )
}
