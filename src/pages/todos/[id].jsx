import { Loading } from '@/components/base/Loading'
import { PaginationCustom } from '@/components/base/Pagination'
import FormSearch from '@/components/todos/FormSearch'
import { ModalConfirmDelete } from '@/components/todos/ModalConfirmDelete'
import { ModalCreateTodoItemDetail } from '@/components/todos/ModalCreateTodoItemDetail'
import { createTodoItemDetail, deleteTodoItemDetail, getItemDetail, updateTodoItemDetail } from '@/services/todo'
import { baseURL, domain } from '@/utils/config'
import { fetcherGet } from '@/utils/function'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const ItemDetail = ({ id, title, todo }) => {
  const router = useRouter()
  const todoId = router.query.id
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenCreateTodoItem, setIsOpenCreateTodoItem] = useState(false)

  const [todoItem, setTodoItem] = useState({})
  const [page, setPage] = useState(1)
  const [queries, setQueries] = useState({ q: '', sortField: 'createdAt', sortOrder: 'ASC' })
  const address = useMemo(() => (`${baseURL}/api/todos/${todoId}?page=${page}&sortField=${queries.sortField}&sortOrder=${queries.sortOrder}&q=${queries.q.toLocaleLowerCase()}`), [todoId, page, queries])
  const { data, isLoading, mutate: getTodoDetail } = useSWR(address, fetcherGet, { initialData: todo })

  useEffect(() => {
    if (page && queries) {
      getTodoDetail()
    }
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

  const handleDeleteTodoItemDetail = async () => {
    try {
      const res = await deleteTodoItemDetail(todoId, todoItem?.id)
      if (res) toast.success('Delete item success')
      getTodoDetail()
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
        const res = await createTodoItemDetail(todoId, values)
        if (res) {
          getTodoDetail()
          toast.success('Add new success')
        }
      } catch (error) {
        toast.error('Something error!')
      }
      toggleOpenCreateTodoItem()
      return
    }

    try {
      const res = await updateTodoItemDetail({ todoId, todoItemId: todoItem?.id }, values)

      if (res) {
        toast.success('Edit item success')
        getTodoDetail()
      }
    } catch (error) {
      toast.error('Something error!')
    }

    toggleOpenCreateTodoItem()
  }

  const goBack = () => {
    router.push('/')
  }

  return (
    <div className="text-center pt-5 px-3">
      <Head>
        <title>{title} - The todo item detail</title>
        <meta name="description" content={`Learn more about ${title}`} />
        <meta property="og:title" content={`${title} - The todo item detail`} />
        <meta property="og:description" content={`Learn more about ${title}, you can see list items detail of them, it include status checked, name, created date, and updated date for the item detail`} />
        <meta property="og:url" content={`${domain}/todos/${id}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="d-flex justify-content-between gap-3 pb-4"><FormSearch handleSearch={handleSearch} /> <div className="d-flex gap-2"><Button onClick={goBack} variant="seconary">Back</Button><Button onClick={toggleOpenCreateTodoItem}>Add New</Button></div></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Checked</th>
            <th>Name</th>
            <th>Created Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.todo?.TodoItems?.map((item, index) => (
            <tr key={item.id}>
              <td>{page > 1 ? (page - 1) * 10 + (index + 1) : index + 1}</td>
              <td><Form.Check disabled checked={item.checked} /></td>
              <td>{item.name}</td>
              <td>{moment(item.createdAt).format('MM/DD/YYYY')}</td>
              <td className="action-box">
                <Button onClick={() => toggleOpenCreateTodoItem(item)} variant="secondary">Edit</Button>
                <Button onClick={() => toggleConfirmDelete(item)} variant="secondary">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data?.meta?.totalPages && <PaginationCustom page={page} setPage={setPage} totalPage={data?.meta?.totalPages || 0} />}
      {isOpenDelete && <ModalConfirmDelete onSubmit={handleDeleteTodoItemDetail} isVisible titleItem={todoItem?.name} handleClose={toggleConfirmDelete} />}
      {isLoading && <Loading />}
      {isOpenCreateTodoItem && <ModalCreateTodoItemDetail handleSubmit={handleCreateTodoItem} todoItem={todoItem} todoId={todoItem?.id} isVisible handleClose={toggleOpenCreateTodoItem} />}
    </div>

  )
}

export default ItemDetail

// export async function getStaticPaths() {
//   const res = await fetchData(1)
//   const { totalPages } = res.meta

//   let paths = []

//   for (let i = 1; i <= totalPages; i += 1) {
//     const data = await fetchData(i)
//     const path = data?.todos?.map((item) => ({
//       params: { id: item.id.toString() }
//     }))
//     paths = [...paths, ...path]
//   }

//   return { paths, fallback: true }
// }

// export async function getStaticProps({ params }) {
//   const { todo } = await getItemDetail(params?.id)

//   return {
//     props: {
//       title: todo?.title,
//       todoItems: todo?.TodoItems,
//       id: todo?.id,
//       todo
//     }
//   }
// }

export async function getServerSideProps(context) {
  const { id } = context.query
  const { todo } = await getItemDetail(id)

  return {
    props: {
      title: todo?.title,
      todoItems: todo?.TodoItems,
      id: todo?.id,
      todo
    }
  }
}
