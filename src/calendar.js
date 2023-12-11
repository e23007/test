import { useState } from 'react'
import {
  Container,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer
} from '@chakra-ui/react'

// カレンダーの配列作成
const createMatrix = (list, colN) => {
  const reduceFun = colN => (matrix, cur, index) =>
    index % colN === 0
      ? [...matrix, [cur]]
      : [...matrix.slice(0, -1), [...matrix.at(-1), cur]]
  return list.reduce(reduceFun(colN), [])
}

// 日付の開始曜日、月の最終日を取得
const createCalendar = (date, pad = ' ') => {
  const createOffset = (
    c => n =>
      [...Array(n)].fill(c)
  )(pad)
  const createRange = (n, start = 0) =>
    [...Array(n)].map((_, index) => index + start)
  const firstDayOfMonth = d => new Date(d.getFullYear(), d.getMonth())
  const lastDayOfMonth = d =>
    new Date(new Date(d).setMonth(d.getMonth() + 1, 0))
  const headOffset = firstDayOfMonth(date).getDay()
  const daysOfMonth = lastDayOfMonth(date).getDate()
  const tailOffset = 7 - ((headOffset + daysOfMonth) % 7)
  return createMatrix(
    [
      createOffset(headOffset),
      createRange(daysOfMonth, 1),
      createOffset(tailOffset)
    ].flat(),
    7
  )
}

// ここから下は出力
// 曜日の為の関数
const WeekCalendar = ({ week }) => (
  <Tr>
    {week.map(day => (
      <Td key={day.id}>{day}</Td>
    ))}
  </Tr>
)

// カレンダーの日付
const MonthCalendar = ({ calendar }) => {
  const headings = '日月火水木金土'.split('')
  return (
    <TableContainer>
      <Table>
        <Thead>
          <WeekCalendar week={headings} />
        </Thead>
        <Tbody>
          {calendar.map(week => (
            <WeekCalendar week={week} key={week.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

// カレンダーの年月日表記&月変動ボタン
const Calendar = props => {
  const [date, setDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth())
  )

  const changeMonth = (d, n) =>
    new Date(new Date(d).setMonth(new Date(d).getMonth() + n))

  const handleClick = n => () => setDate(d => changeMonth(d, n))
  const handleReset = () =>
    setDate(new Date(new Date().getFullYear(), new Date().getMonth()))
  const formatDate = d => `${d.getFullYear()}年${d.getMonth() + 1}月`

  return (
    <Container centerContent p={{ base: '4', md: '6' }} maxWidth='3xl'>
      <h1>{formatDate(date)}</h1>
      <Box>
        <Button type='button' className='button' onClick={handleClick(-1)}>
          prev
        </Button>
        <Button type='button' className='button' onClick={handleReset}>
          now
        </Button>
        <Button type='button' className='button' onClick={handleClick(+1)}>
          next
        </Button>
      </Box>
      <MonthCalendar calendar={createCalendar(date)} />
    </Container>
  )
}

export default Calendar
