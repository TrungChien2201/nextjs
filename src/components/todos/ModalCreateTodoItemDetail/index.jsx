import { ErrorMessage } from '@/components/base/ErrorMessage'
import { ModalCustom } from '@/components/base/Modal'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'

export const ModalCreateTodoItemDetail = ({ todoId, handleClose, handleSubmit, isVisible, todoItem }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      checked: false
    },
    onSubmit: (values) => {
      handleSubmit(values)
      formik.resetForm()
    },
    validationSchema
  })

  useEffect(() => {
    if (todoItem?.name) {
      formik.setValues({ name: todoItem?.name, checked: todoItem?.checked })
    }
  }, [todoItem])

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalCustom
        contentClassName="modal-custom-height"
        isVisible={isVisible}
        title={todoId ? 'Edit Item' : 'Create Item'}
        handleClose={() => {
          formik.resetForm()
          handleClose()
        }}
        onSubmit={formik.handleSubmit}
        submitText={todoId ? 'Update' : 'Save'}
      >
        <Form.Label htmlFor="basic-url">Name Item</Form.Label>
        <Form.Control
          placeholder="Name"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik?.errors?.name && <ErrorMessage error={formik.errors.name} />}
        <Form.Check
          id="checked"
          className="mt-3"
          name="checked"
          label="Checked"
          onChange={formik.handleChange}
          checked={formik.values.checked}
        />
      </ModalCustom>
    </form>
  )
}
