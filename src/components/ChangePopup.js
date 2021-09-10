// import TodoForm from './TodoForm'
// import '../style.css'
import ChangeTask from './ChangeTask'



const ChangePopup = (props) => {
  console.log(props);
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <ChangeTask deadline={props.deadline} changeTask={props.changeTask} onChanged={props.onChanged} oldText={props.oldText} />
        <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
      </div>
    </div>
  ) : '';
}

export default ChangePopup
