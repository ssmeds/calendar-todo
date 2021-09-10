// import TodoForm from './TodoForm'
// import '../style.css'
import AddTask from './AddTask'



const Popup = (props) => {

  console.log(props);

  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <AddTask deadline={props.deadline} onAdd={props.onAdd} />
        <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
      </div>
    </div>
  ) : '';
}

export default Popup
