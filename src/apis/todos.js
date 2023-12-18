import axios from 'axios'

const todoDataUrl = 'http://localhost:3000/todos'
// CRUD: create Read Update Delete

// Read
export const getAllTodosData = async () => {
  const response = await axios.get(todoDataUrl)
  return response.data
}

// Create
export const addTodoData = async todo => {
  const response = await axios.post(todoDataUrl, todo)
  return response.data
}

// Delete
export const deleteTodoData = async id => {
  await axios.delete(`${todoDataUrl}/${id}`)
  return id
}

// Update
export const updateTodoData = async (id, todo) => {
  const response = await axios.put(`${todoDataUrl}/${id}`, todo)
  return response.data
}
