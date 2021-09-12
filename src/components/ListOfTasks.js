import Task from './Task'

const ListOfTasks = ({ tasks, onDelete, onChanged }) => {

  let sortedTasks = tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1)

  return (
    <div className={`task`}>
      <h1>Att göra lista</h1>

      {sortedTasks.map((task) => (
        <>
          {sortedTasks.length > 0 ? (
            <Task key={task.id} task={task} onDelete={onDelete} onChanged={onChanged} />
          ) : ('Inga todos')}
        </>
      ))}
    </div>
  )
}

export default ListOfTasks
