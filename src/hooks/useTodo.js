import { useState, useEffect } from 'react'
import { ulid } from 'ulid'
import * as todoData from '../apis/todos'

export const useTodo = () => {
  const [todoList, setTodoList] = useState([])
  // Read ToDoデータの取得
  useEffect(() => {
    todoData.getAllTodosData().then(todo => {
      setTodoList([...todo].reverse())
    })
  }, [])
  // Create ToDoデータの追加
  const addTodoListItem = todoContent => {
    const newTodoItem = {
      content: todoContent,
      id: ulid(),
      done: false
    }
    todoData.addTodoData(newTodoItem).then(addTodo => {
      setTodoList([addTodo, ...todoList])
    })
  }
  // Update,Todoステータス(完了・未完了の変更)
  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find(item => item.id === id)
    const newTodoItem = { ...todoItem, done: !done }
    todoData.updateTodoData(id, newTodoItem).then(updatedTodo => {
      const newTodoList = todoList.map(item =>
        item.id !== updatedTodo.id ? item : updatedTodo
      )
      setTodoList(newTodoList)
    })
  }
  // Delete Todoのアイテムを削除する
  const deleteTodoListItem = id => {
    todoData.deleteTodoData(id).then(deleteListItemId => {
      const newTodoList = todoList.filter(item => item.id !== deleteListItemId)
      setTodoList(newTodoList)
    })
  }
  return {
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem
  }
}
