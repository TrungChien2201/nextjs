import { Loading } from '@/components/base/Loading'
import { PaginationCustom } from '@/components/base/Pagination'
import FormSearch from '@/components/todos/FormSearch'
import { ModalConfirmDelete } from '@/components/todos/ModalConfirmDelete'
import { ModalCreateTodoItem } from '@/components/todos/ModalCreateTodoItem'
import { createTodoItem, deleteTodoItem, fetchData, updateTodoItem } from '@/services/todo'
import { baseURL } from '@/utils/config'
import { fetcherGet } from '@/utils/function'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import useSWR from 'swr'

export default function TodosPage(props) {
  const router = useRouter()
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenCreateTodoItem, setIsOpenCreateTodoItem] = useState(false)

  const [todoItem, setTodoItem] = useState({})
  const [page, setPage] = useState(1)
  const [queries, setQueries] = useState({ q: '', sortField: 'createdAt', sortOrder: 'ASC' })
  const address = useMemo(() => (`${baseURL}/api/todos?page=${page}&sortField=${queries.sortField}&sortOrder=${queries.sortOrder}&q=${queries.q.toLocaleLowerCase()}`), [page, queries])
  const { data, isLoading, mutate: getTodos } = useSWR(address, fetcherGet, { initialData: props.initData })

  useEffect(() => {
    getTodos()
  }, [page, queries])

  const toggleConfirmDelete = (item) => {
    setIsOpenDelete(!isOpenDelete)
    if (item) {
      setTodoItem(item)
      return
    }
    setTodoItem(null)
  }

  const handleSearch = (values) => {
    if (values) {
      setQueries({ ...queries, ...values })
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await deleteTodoItem(todoItem?.id)
      if (res) toast.success('Delete item success')
      getTodos()
      toggleConfirmDelete()
    } catch (error) {
      toast.error('Something error!')
      toggleConfirmDelete()
    }
  }

  const toggleOpenCreateTodoItem = (item) => {
    setIsOpenCreateTodoItem(!isOpenCreateTodoItem)
    if (item) {
      setTodoItem(item)
      return
    }
    setTodoItem(null)
  }

  const handleCreateTodoItem = async (values) => {
    if (!todoItem?.id) {
      try {
        const res = await createTodoItem(values)
        if (res) {
          getTodos()
          toast.success('Add new success')
        }
      } catch (error) {
        toast.error('Something error!')
      }
      toggleOpenCreateTodoItem()
      return
    }

    try {
      const res = await updateTodoItem(todoItem?.id, values)

      if (res) {
        toast.success('Edit item success')
        getTodos()
      }
    } catch (error) {
      toast.error('Something error!')
    }

    toggleOpenCreateTodoItem()
  }

  const redirectToDetail = (id) => {
    router.push(`/todos/${id}`)
  }

  return (
    <div className="text-center pt-5 px-3">
      <div className="d-flex justify-content-between gap-3 pb-4"><FormSearch handleSearch={handleSearch} /> <Button onClick={toggleOpenCreateTodoItem}>Add New</Button></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Created Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.todos?.map((item, index) => (
            <tr key={item.id}>
              <td>{page > 1 ? (page - 1) * 10 + (index + 1) : index + 1}</td>
              <td>{item.title}</td>
              <td>{moment(item.createdAt).format('MM/DD/YYYY')}</td>
              <td className="action-box">
                <Button onClick={() => toggleOpenCreateTodoItem(item)} variant="secondary">Edit</Button>
                <Button onClick={() => toggleConfirmDelete(item)} variant="secondary">Delete</Button>
                <Button onClick={() => redirectToDetail(item.id)} variant="secondary">Detail</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data?.meta?.totalPages && <PaginationCustom page={page} setPage={setPage} totalPage={data?.meta?.totalPages || 0} />}
      <ModalConfirmDelete onSubmit={handleSubmit} isVisible={isOpenDelete} titleItem={todoItem?.title} handleClose={toggleConfirmDelete} />
      {isLoading && <Loading />}
      <ModalCreateTodoItem handleSubmit={handleCreateTodoItem} todoItem={todoItem} todoId={todoItem?.id} isVisible={isOpenCreateTodoItem} handleClose={toggleOpenCreateTodoItem} />
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetchData()

  return {
    props: { initData: data }
  }
}
