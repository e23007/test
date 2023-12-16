import { Textarea, Button } from '@chakra-ui/react'
export const TodoAdd = ({
  inputEl,
  handleAddTodoListItem,
  placeholder,
  leftIcon,
  buttonText
}) => {
  return (
    <>
      <Textarea
        bgColor='white'
        mt='8'
        borderColor='gray.400'
        ref={inputEl}
        placeholder={placeholder}
      />
      <Button
        onClick={handleAddTodoListItem}
        colorScheme='blue'
        leftIcon={leftIcon}
        mt='8'
      >
        {buttonText}
      </Button>
    </>
  )
}
