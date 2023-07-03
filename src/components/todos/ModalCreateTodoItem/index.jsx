import { ErrorMessage } from '@/components/base/ErrorMessage'
import { ModalCustom } from '@/components/base/Modal'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import AddNewListTodoItems from '../AddNewListTodoItems'

export const ModalCreateTodoItem = ({ todoId, handleClose, handleSubmit, isVisible, todoItem }) => {
  const [listTodoItems, setListTodosItems] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required!')
  })

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    onSubmit: (values) => {
      setTimeout(() => {
        formik.resetForm()
        setListTodosItems([])
      }, 500)

      if (!todoId) {
        handleSubmit({ ...values, TodoItems: listTodoItems.map((v) => ({ name: v.name, checked: v.checked })) })
        return
      }
      handleSubmit(values)
    },
    validationSchema
  })

  useEffect(() => {
    if (todoItem?.title) {
      formik.setFieldValue('title', todoItem?.title)
    }
  }, [todoItem])

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalCustom
        isVisible={isVisible}
        title={todoId ? 'Edit Item' : 'Create Item'}
        handleClose={() => {
          formik.resetForm()
          handleClose()
          setListTodosItems([])
        }}
        isDisabled={isEdit}
        onSubmit={formik.handleSubmit}
        submitText={todoId ? 'Update' : 'Save'}
      >
        <Form.Label htmlFor="basic-url">Title Todo Item</Form.Label>
        <Form.Control
          placeholder="Title"
          id="title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik?.errors?.title && <ErrorMessage error={formik.errors.title} />}
        {!todoId ? <AddNewListTodoItems isDisabled={isEdit} isEdit={isEdit} setIsEdit={setIsEdit} listTodoItems={listTodoItems} setListTodosItems={setListTodosItems} /> : null}
      </ModalCustom>
    </form>
  )
}
