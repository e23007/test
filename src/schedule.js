import { useState } from 'react'

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
  return (
    <div>
      <p>{Message}</p>
      <label>
        やること：
        <input
          type='text'
          name='title'
          value={title}
          onChange={handleChangeTitle}
        />
      </label>
      <button type='button' onClick={handleClick}>
        追加
      </button>
      <button type='button' onClick={handleSort}>
        ソート({desc ? '↑' : '↓'})
      </button>
      <hr />
      <ul>
        {list.map(item => (
          <li key={item.id} className={item.isDone ? 'done' : ''}>
            {item.title}
            <button type='button' onClick={handleDone} data-id={item.id}>
              済
            </button>
            <button type='button' onClick={handleRemove} data-id={item.id}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Schedule
