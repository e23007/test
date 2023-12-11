import { useState } from 'react'
import { Button, Container, Box } from '@chakra-ui/react'

let maxId = 0

export const Schedule = () => {
  const [title, setTitle] = useState('')
  const [list, setList] = useState([])
  const [desc, setDesc] = useState(true)
  const [Message, setMessage] = useState(null)
  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }
  const handleClick = () => {
    if (title !== '') {
      setList([
        ...list,
        {
          id: ++maxId,
          title,
          created: new Date(),
          isDone: false
        }
      ])
      setMessage(null)
    } else {
      setMessage('記入して下さい')
    }
    setTitle('')
  }
  const handleDone = e => {
    setList(
      list.map(item => {
        if (item.id === Number(e.target.dataset.id)) {
          return {
            ...item,
            isDone: true
          }
        } else {
          return item
        }
      })
    )
  }
  const handleRemove = e => {
    setList(list.filter(item => item.id !== Number(e.target.dataset.id)))
  }
  const handleSort = e => {
    const sorted = [...list]
    sorted.sort((m, n) => {
      if (desc) {
        return n.created.getTime() - m.created.getTime()
      } else {
        return m.created.getTime() - n.created.getTime()
      }
    })
    setDesc(d => !d)
    setList(sorted)
  }
  // useEffect(()=>{
  //     const getList=localStorage.saveKey()
  //     setList([...getList])
  // },[])
  return (
    <Container centerContent p={{ base: '4', md: '6' }} maxWidth='3xl'>
      <p>{Message}</p>
      <Box>
        <textarea
          onChange={handleChangeTitle}
          type='text'
          name='title'
          value={title}
          placeholder='予定'
          bgColor='white'
          mt='8'
          borderColor='gray.400'
        />
        {/* <Stack direction='row' spacing={4} align='center'> */}
        <Button onClick={handleClick} colorScheme='teal' variant='ghost'>
          追加
        </Button>
        <Button onClick={handleSort} colorScheme='teal' variant='ghost'>
          ソート({desc ? '↑' : '↓'})
        </Button>
        {/* </Stack> */}
      </Box>
      <hr />
      <ul>
        {list.map(item => (
          <li key={item.id} className={item.isDone ? 'done' : ''}>
            {item.title}
            <Button
              onClick={handleDone}
              data-id={item.id}
              colorScheme='teal'
              variant='ghost'
              type='button'
            >
              済
            </Button>
            <Button
              onClick={handleRemove}
              data-id={item.id}
              colorScheme='teal'
              variant='ghost'
              type='button'
            >
              削除
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  )
}
export default Schedule
