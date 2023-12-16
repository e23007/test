import { TodoTitle } from './TodoTitle'
import { TodoItem } from './TodoItem'
import { List } from '@chakra-ui/react'
export const TodoList = ({
  todoList,
  toggleTodoListItemStatus,
  deleteTodoListItem,
  title,
  as,
  fontSize
}) => {
  return (
    <>
      {todoList.length !== 0 && (
        <>
          <TodoTitle title={title} as={as} mt='12' fontSize={fontSize} />
          <List w='full'>
            {todoList.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
              />
            ))}
          </List>
        </>
      )}
    </>
  )
}
