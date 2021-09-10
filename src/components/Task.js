import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import ChangePopup from './ChangePopup'

const Task = ({ task, onDelete, changeTask, deadline, onChanged }) => {

  const [changePopup, setChangePopup] = useState(false)
  return (


    <h3 onClick={() => {
      changeTask(task.id)
      setChangePopup(true)
    }}>{task.text}
      <p className='task-p'>{task.deadline}</p>

      <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => onDelete(task.id)}
      />
      <ChangePopup trigger={changePopup} setTrigger={setChangePopup} deadline={deadline} changeTask={changeTask} oldText={task.text} onChanged={onChanged}>
        <h2>Vill du ändra deadline?</h2>
        <h3>{deadline}</h3>
      </ChangePopup>
    </h3>


  )
}

export default Task
