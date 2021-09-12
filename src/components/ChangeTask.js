import { useState } from 'react'

const ChangeTask = ({ onChanged, oldText, setShow, id, deadline }) => {
  const [newText, setNewText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!newText) {
      alert('Please add a task')
      return
    }

    onChanged({ newText, id, deadline })

    setNewText('')
    setShow(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder={oldText}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default ChangeTask