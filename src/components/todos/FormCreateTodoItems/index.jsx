import { ErrorMessage } from '@/components/base/ErrorMessage'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import * as Yup from 'yup'

const FormCreateTodoItems = ({ handleSubmit, todoItem, handleClose }) => {
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
      handleClose()
    },
    validationSchema
  })

  useEffect(() => {
    if (todoItem?.name) {
      formik.setValues({ name: todoItem?.name, checked: todoItem?.checked })
    }
  }, [todoItem])

  return (
    <form className="py-3" onSubmit={formik.handleSubmit}>
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
      <div className="d-flex gap-3 mt-3">
        <Button variant="secondary" type="button" onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

export default FormCreateTodoItems
