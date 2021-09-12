import moment from 'moment/min/moment-with-locales.js'
import { useState, useEffect } from 'react'
import Calendar from './components/Calender'
import ListOfTasks from './components/ListOfTasks';

const year = moment().format('YYYY')

const holidaysAPI = `https://sholiday.faboul.se/dagar/v2.1/${year}`

function App() {
  const [value, setValue] = useState(moment())
  const [tasks, setTasks] = useState([])
  const [holidays, setHolidays] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  //FETCH HOLIDAYS
  useEffect(() => {
    fetch(holidaysAPI)
      .then(res => res.json())
      .then((data) => {
        const holidays = data.dagar
        setHolidays(holidays)
      })
  }, [])

  //FETCH TASK
  const fetchTask = async (id) => {

    // const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const res = await fetch(`https://stinas-calendar-todo.herokuapp.com/tasks/${id}`)
    const data = await res.json()
    return data


    ////////////// LOCALSTORAGE /////////////
    // //Get local storage objects
    // let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    // console.log('tasks', tasks);
    // //Find specific task by id
    // let task = tasks.filter((task) => task.id === id)
    // console.log('task found', task);
    // return task
    /////////////////////////////////////////
  }

  //FETCH TASKS
  const fetchTasks = async () => {

    // const res = await fetch('http://localhost:5000/tasks')
    const res = await fetch('https://stinas-calendar-todo.herokuapp.com/tasks')
    const data = await res.json()
    return data

    ////////////// LOCALSTORAGE /////////////
    // //Get local storage objects
    // let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // return tasks
    /////////////////////////////////////////
  }

  //ADD TASK
  const addTask = async (task) => {

    const res = await fetch('https://stinas-calendar-todo.herokuapp.com/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    ////////////// LOCALSTORAGE /////////////
    // //Get local storage objects
    // let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    // //Push to array
    // tasks.push({ id: Math.floor(Math.random() * 1000), text: task.text, deadline: task.deadline })
    // //Save to local storage
    // localStorage.setItem('tasks', JSON.stringify(tasks))

    // setTasks([...tasks])
    // // setTodo(task)
    /////////////////////////////////////////
  }

  //DELETE TASK
  const deleteTask = async (id) => {

    await fetch(`https://stinas-calendar-todo.herokuapp.com/tasks/${id}`, {
      method: 'DELETE',

    })

    setTasks(tasks.filter((task) => task.id !== id))

    ////////////// LOCALSTORAGE /////////////
    // //Get local storage objects
    // let LStasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // //Filter out the specific item that should be removed
    // let LStask = LStasks.filter((task) => task.id !== id)

    // //Save updated object array to local storage
    // localStorage.setItem('tasks', JSON.stringify(LStask))

    // setTasks(tasks.filter((task) => task.id !== id))
    /////////////////////////////////////////
  }

  //CHANGE TASK
  const changeTask = async (id) => {
    const taskToChange = await fetchTask(id.id)
    const updTask = { ...taskToChange, text: id.newText }

    const res = await fetch(`https://stinas-calendar-todo.herokuapp.com/tasks/${id.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map(task => {
        return (
          task.id === id.id ? { ...task, text: data.text } : task)
      })
    )

    ////////////// LOCALSTORAGE /////////////
    // //Get specific task to update or remove
    // const taskToChange = await fetchTask(id.id)


    // //new entry
    // let newEntry = {
    //   deadline: id.deadline,
    //   id: id.id,
    //   text: id.newText
    // }

    // //fetch all tasks
    // let tasks = await fetchTasks()

    // //filter out the changed task from tasks
    // let filteredTasks = tasks.filter((task) => task.id !== id.id)

    // //push new entry onto the filtered list of tasks
    // filteredTasks.push(newEntry)

    // //set localstorage to the new updated list of tasks
    // localStorage.setItem('tasks', JSON.stringify(filteredTasks))

    // //fetch updated list of tasks
    // let updatedTasks = await fetchTasks()

    // //settasks to that updated list of tasks
    // setTasks(updatedTasks)

    // // const updTask = { ...taskToToggle}
    // // setTasks(
    // //   tasks.map((task) => task.id === id ? { ...task} : task))
    ////////////////////////////////////////////
  }



  return (
    <div className='App'>
      <div className='listOfTasks'>
        <ListOfTasks tasks={tasks} onDelete={deleteTask} onChanged={changeTask} />
      </div>
      <div>
        <Calendar value={value} onChange={setValue} onAdd={addTask} tasks={tasks} holidays={holidays} />
      </div>
    </div>
  );
}

export default App;
