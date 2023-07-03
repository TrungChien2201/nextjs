import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useEffect } from 'react'

const FormSearch = ({ handleSearch }) => {
  const formik = useFormik({
    initialValues: {
      q: '',
      sortField: 'createdAt',
      sortOrder: 'ASC'
    },
    onSubmit: (values) => {
      handleSearch({ q: values.q })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    formik.handleSubmit()
  }

  useEffect(() => {
    handleSearch({ sortField: formik.values.sortField, sortOrder: formik.values.sortOrder })
  }, [formik.values.sortField, formik.values.sortOrder])

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <Form.Control placeholder="Search title..." aria-label="Search" onChange={formik.handleChange} id="q" name="q" value={formik.values.q} />
      <Form.Select onChange={formik.handleChange} id="sortField" name="sortField" value={formik.values.sortField} aria-label="Sort by">
        <option value="createdAt">CreatedAt</option>
        <option value="updatedAt">UpdatedAt</option>
      </Form.Select>
      <Form.Select onChange={formik.handleChange} id="sortOrder" name="sortOrder" value={formik.values.sortOrder} aria-label="Order">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </Form.Select>
    </form>
  )
}

export default FormSearch
