import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormCreateTodoItems from '../FormCreateTodoItems'

const TodoItem = ({ item, handleOpenEditTodoItem, handleDeleteTodoItem, handleSubmit, isDisabled, setTodoItem, setIsDisabled }) => {
  const [isEdit, setIsEdit] = useState(false)

  const handleClose = () => {
    setIsEdit(false)
    setTodoItem('')
    setIsDisabled(false)
  }

  const handleOpenEdit = (todoItem) => {
    handleOpenEditTodoItem(todoItem)
    setIsEdit(true)
    setIsDisabled(true)
  }

  return (
    <div>
      {isEdit ? <FormCreateTodoItems todoItem={item} handleClose={handleClose} handleSubmit={handleSubmit} />
        : (
          <div className="d-flex justify-content-between mb-3 pt-3">
            <div className="d-flex">
              <Form.Check disabled checked={item.checked} label={item.name} />
            </div>
            <div className="d-flex gap-3">
              <Button disabled={isDisabled} onClick={() => handleOpenEdit(item)} variant="secondary">Edit</Button>
              <Button disabled={isDisabled} onClick={() => handleDeleteTodoItem(item.id)} variant="secondary">Delete</Button>
            </div>
          </div>
        )}
    </div>
  )
}

export default TodoItem
