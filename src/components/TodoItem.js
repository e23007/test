import { ListItem, Text, Flex, Button, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
export const TodoItem = ({
  todo,
  toggleTodoListItemStatus,
  deleteTodoListItem
}) => {
  const handleToggleTodoListItemStatus = () =>
    toggleTodoListItemStatus(todo.id, todo.done)
  const handleDeleteTodoListItem = () => {
    deleteTodoListItem(todo.id)
  }
  const setColorScheme = todo.done ? 'pink' : 'blue'
  const label = todo.done ? '未完了リストへ' : '完了リストへ'
  return (
    <ListItem
      borderWidth='1px'
      p='4'
      mt='4'
      bg='white'
      borderRadius='md'
      borderColor='gray.300'
    >
      <Text md='6'>{todo.content}</Text>
      <Flex align='center' justify='flex-end'>
        <Button
          onClick={handleToggleTodoListItemStatus}
          colorScheme={setColorScheme}
          variant='outline'
          size='sm'
        >
          {label}
        </Button>
        <IconButton
          onClick={handleDeleteTodoListItem}
          icon={<DeleteIcon />}
          variant='unstyled'
          aria-label='delete'
          border='none'
        >
          削除
        </IconButton>
      </Flex>
    </ListItem>
  )
}
