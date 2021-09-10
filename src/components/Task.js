import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import ChangePopup from './ChangePopup'

const Task = ({ task, onDelete, deadline, onChanged }) => {

  const [changePopup, setChangePopup] = useState(false)

  return (

    <>
      <h3 onClick={() => {
        setChangePopup(true)
      }}>{task.text}
        <p className='task-p'>{task.deadline}</p>

        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />

      </h3>
      <ChangePopup show={changePopup} setShow={setChangePopup} deadline={task.deadline} oldText={task.text} onChanged={onChanged} id={task.id}>
        <h3>{task.deadline}</h3>
        <h4>{task.text}</h4>
      </ChangePopup>
    </>
  )
}

export default Task
