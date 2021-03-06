import { useState, useEffect } from 'react'
import buildCalender from './buildCalender'
import { dayStyles } from './styles'
import Header from './Header'
import Popup from './Popup'

// CONSOLE LOG so I can log from inside .map()
// const ConsoleLog = (children) => {
//   console.log(children)
//   return false
// }

const Calendar = ({ value, onChange, onAdd, tasks, holidays }) => {
  const [calendar, setCalendar] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [deadline, setDeadline] = useState('')

  useEffect(() => {

    setCalendar(buildCalender(value, tasks))
  }, [value, tasks])

  return (
    <div className='calendar' key={Math.floor(Math.random() * 10000) + 1}>
      <Header value={value} setValue={onChange} />
      <div key={Math.floor(Math.random() * 10000) + 1} className='body'>
        <div className='day-names' key={Math.floor(Math.random() * 1000) + 1}>
          {
            ['m', 't', 'o', 't', 'f', 'l', 's'].map((d) => (<div key={Math.floor(Math.random() * 10000) + 1} className="week">{d}</div>
            ))}
        </div>
        {calendar.map((week) => (
          <div key={Math.floor(Math.random() * 10000) + 1} className='flex'>
            {week.map((day) => (
              <div className='day' key={Math.floor(Math.random() * 10000) + 1}
                onClick={(e) => {
                  let deadline = day.format('L')
                  setDeadline(deadline)
                  onChange(day)
                  setButtonPopup(true)
                }}
              >
                {holidays.map((holiday) => {
                  return (
                    holiday.datum === day.format('L') ?
                      <>
                        <p key={Math.floor(Math.random() * 10000) + 1} className='flagg'>{holiday.flaggdag}</p>
                        <p key={Math.floor(Math.random() * 10000) + 1} className='helg'>{holiday.helgdag}</p>
                        <p key={Math.floor(Math.random() * 10000) + 1} className='namesday'>{holiday.namnsdag.join(' ')}</p>
                      </> : ''
                  )
                })}

                {tasks.map((task) => {
                  return (
                    task.deadline === day.format('L') ? <li key={Math.floor(Math.random() * 10000) + 1} className='todos'>{task.text}</li> : ''
                  )
                })}
                <div className={dayStyles(day, value)} key={Math.floor(Math.random() * 10000) + 1}>
                  {day.format('D')}

                </div>
              </div>))}
          </div>))}
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} deadline={deadline} onAdd={onAdd}>
        <h3>{deadline}</h3>
      </Popup>
    </div>
  )
}

export default Calendar



