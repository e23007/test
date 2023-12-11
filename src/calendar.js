import { useState } from 'react'

// 受け取った配列を7の倍数で二次配列にするlistは一次配列はcolN7を受けっとている
const createMatrix = (list, colN) => {
  const reduceFun = colN => (matrix, cur, index) =>
    index % colN === 0
      ? [...matrix, [cur]]
      : [...matrix.slice(0, -1), [...matrix.at(-1), cur]]
  return list.reduce(reduceFun(colN), [])
}
// 配列を作るため必要な情報を取るそしてcreateMatrixに渡す
const createCalendar = (date, pad = ' ') => {
  const createOffset = (
    c => n =>
      [...Array(n)].fill(c)
  )(pad)
  const createRange = (n, start = 0) =>
    [...Array(n)].map((_, index) => index + start)
  const firstDayOfMonth = d => new Date(d.getFullYear(), d.getMonth()) // 今月の最初の日を取得
  const lastDayOfMonth = d =>
    new Date(new Date(d).setMonth(d.getMonth() + 1, 0)) // 今月の最後の日を(30や31)取得
  const headOffset = firstDayOfMonth(date).getDay()
  const daysOfMonth = lastDayOfMonth(date).getDate()
  const tailOffset = 7 - ((headOffset + daysOfMonth) % 7) // 7の倍数にする為31日後の空白を作成
  return createMatrix(
    [
      createOffset(headOffset),
      createRange(daysOfMonth, 1),
      createOffset(tailOffset)
    ].flat(),
    7
  )
}
// 曜日、週のテーブルに格納
const WeekCalendar = ({ week }) => (
  <tr>
    {week.map(day => (
      <td key={day.id}>{day}</td>
    ))}
  </tr>
)
// 曜日をtheadに週間をtbodyにWeekCalendar関数に渡す
const MonthCalendar = ({ calendar }) => {
  const headings = '日月火水木金土'.split('')
  return (
    <table>
      <thead>
        <WeekCalendar week={headings} />
      </thead>
      <tbody>
        {calendar.map(week => (
          <WeekCalendar week={week} key={week.id} />
        ))}
      </tbody>
    </table>
  )
}

// 年月日、テーブル、ボタンを合体
const Calendar = props => {
  const [date, setDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth())
  )

  const changeMonth = (d, n) =>
    new Date(new Date(d).setMonth(new Date(d).getMonth() + n))

  const handleReset = () => {
    setDate(new Date(new Date().getFullYear(), new Date().getMonth()))
  }
  const handleClick = n => () => setDate(d => changeMonth(d, n))
  const formatDate = d => `${d.getFullYear()}年${d.getMonth() + 1}月`
  return (
    <>
      <h1>{formatDate(date)}</h1>
      <button onClick={handleClick(-1)}>prev</button>
      <button onClick={handleReset}>now</button>
      <button onClick={handleClick(+1)}>next</button>
      <MonthCalendar calendar={createCalendar(date)} />
    </>
  )
}

export default Calendar
