import { useState } from 'react'
import FormCreateTodoItems from '../FormCreateTodoItems'

const { Button } = require('react-bootstrap')
const { default: TodoItem } = require('../TodoItem')

const AddNewListTodoItems = ({ listTodoItems, setListTodosItems, isEdit, setIsEdit, isDisabled }) => {
  const [todoItem, setTodoItem] = useState('')
  const [isShowFormInput, setIsShowFormInput] = useState(false)

  const toggleAddNewItem = () => {
    if (!todoItem?.id) {
      setIsShowFormInput(!isShowFormInput)
    }
    setIsEdit(!isEdit)
    if (todoItem?.id && isShowFormInput) {
      setTodoItem('')
    }
  }

  const handleSubmit = (values) => {
    setIsEdit(false)
    setTodoItem('')
    setIsShowFormInput(false)
    if (!todoItem?.id) {
      setListTodosItems([...listTodoItems, { ...values, id: Math.floor(Math.random() * 100) }])
      return
    }

    const newTodoItems = listTodoItems.map((v) => {
      if (v.id === todoItem?.id) {
        return { ...v, ...values }
      }
      return v
    })
    setListTodosItems(newTodoItems)
  }

  const handleOpenEditTodoItem = (item) => {
    setTodoItem(item)
  }

  const handleDeleteTodoItem = (id) => {
    setListTodosItems(listTodoItems.filter((item) => item.id !== id))
  }

  return (
    <div className="pt-3">
      <div>List child items</div>
      {listTodoItems.map((item) => (
        <TodoItem isDisabled={isDisabled} setIsDisabled={setIsEdit} setTodoItem={setTodoItem} handleSubmit={handleSubmit} handleDeleteTodoItem={handleDeleteTodoItem} handleOpenEditTodoItem={handleOpenEditTodoItem} key={item.id} item={item} />
      ))}
      {isShowFormInput && !todoItem && <FormCreateTodoItems handleClose={toggleAddNewItem} handleSubmit={handleSubmit} />}
      {!isShowFormInput && <Button disabled={isDisabled} className="mt-3" onClick={toggleAddNewItem}>+ Add</Button>}
    </div>
  )
}

export default AddNewListTodoItems
