import { baseURL } from '@/utils/config'
import axios from 'axios'

export async function fetchData(page) {
  try {
    const res = await axios.get(`${baseURL}/api/todos?page=${page}`)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}

export async function deleteTodoItem(todoId) {
  try {
    const res = await axios.delete(`${baseURL}/api/todos/${todoId}`)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}

export async function createTodoItem(body) {
  try {
    const res = await axios.post(`${baseURL}/api/todos`, body)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}

export async function updateTodoItem(todoId, body) {
  try {
    const res = await axios.put(`${baseURL}/api/todos/${todoId}`, { title: body.title })
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}

export async function getItemDetail(id) {
  try {
    const res = await axios.get(`${baseURL}/api/todos/${id}`)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}

export async function deleteTodoItemDetail(todoId, todoItemId) {
  try {
    const res = await axios.delete(`${baseURL}/api/todos/${todoId}/todo-items/${todoItemId}`)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}

export async function createTodoItemDetail(todoId, body) {
  try {
    const res = await axios.post(`${baseURL}/api/todos/${todoId}/todo-items`, body)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}

export async function updateTodoItemDetail({ todoId, todoItemId }, body) {
  try {
    const res = await axios.put(`${baseURL}/api/todos/${todoId}/todo-items/${todoItemId}`, body)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}
