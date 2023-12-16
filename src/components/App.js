import { useRef } from 'react'
import { useTodo } from '../hooks/useTodo'
import { TodoAdd } from './TodoAdd'
import { TodoList } from './TodoList'
import { TodoTitle } from './TodoTitle'
import { Container } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const App = () => {
  const {
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem
  } = useTodo()
  const inputEl = useRef(null)
  const handleAddTodoListItem = () => {
    if (inputEl.current.value === '') return
    addTodoListItem(inputEl.current.value)
    inputEl.current.value = ''
  }
  const inCompletedList = todoList.filter(todo => {
    return !todo.done
  })
  const completedList = todoList.filter(todo => {
    return todo.done
  })
  return (
    <Container centerContent p={{ base: '4', md: '6' }} maxWidth='3xl'>
      <TodoTitle
        title='TODO進捗管理'
        as='h1'
        fontSize={{ base: '2xl', md: '3xl' }}
      />
      <TodoAdd
        placeholder='ADD TODO'
        leftIcon={<AddIcon />}
        inputEl={inputEl}
        buttonText='TODOを追加'
        handleAddTodoListItem={handleAddTodoListItem}
      />
      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        fontSize={{ base: 'xl', md: '2xl' }}
        title='未完了TODOリスト'
      />

      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        fontSize={{ base: 'xl', md: '2xl' }}
        title='完了TODOリスト'
      />
    </Container>
  )
}

export default App
