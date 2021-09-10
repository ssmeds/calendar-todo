import moment from 'moment/min/moment-with-locales.js'
import { useState, useEffect } from 'react'
import Calendar from './components/Calender'
import ListOfTasks from './components/ListOfTasks';
// lägg till moment.format('YYYY') istället för 2021
const year = moment().format('YYYY')
console.log(year);
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
    //Get local storage objects
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    //Find specific task by id
    let task = tasks.map((task) => task.id === id)

    return task
  }

  //FETCH TASKS
  const fetchTasks = async () => {
    //Get local storage objects
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    return tasks
  }

  //ADD TASK
  const addTask = async (task) => {
    // console.log(task);

    //Get local storage objects
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    //Push to array
    tasks.push({ id: Math.floor(Math.random() * 1000), text: task.text, deadline: task.deadline })
    //Save to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks))

    setTasks([...tasks])
    // setTodo(task)
  }

  //DELETE TASK
  const deleteTask = async (id) => {
    // console.log('id', id);
    //Get local storage objects
    let LStasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    // console.log(LStasks);

    //Filter out the specific item that should be removed
    let LStask = LStasks.filter((task) => task.id !== id)

    //Save updated object array to local storage
    localStorage.setItem('tasks', JSON.stringify(LStask))

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //CHANGE TASK
  const changeTask = async (id) => {
    console.log(id);
    console.log('Här är inne i changeTask');
    // const taskToChange = await fetchTask(id)
    // const updTask = { ...taskToToggle}



    // setTasks(
    //   tasks.map((task) => task.id === id ? { ...task} : task))
  }



  return (
    <div className='App'>
      <div className='listOfTasks'>
        <ListOfTasks tasks={tasks} onDelete={deleteTask} onChanged={changeTask} changeTask={changeTask} />
      </div>
      <div>
        <Calendar value={value} onChange={setValue} onAdd={addTask} tasks={tasks} holidays={holidays} />
      </div>
    </div>
  );
}

export default App;
