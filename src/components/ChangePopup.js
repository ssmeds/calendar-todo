import ChangeTask from './ChangeTask'

const ChangePopup = (props) => {

  return (props.show) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <ChangeTask deadline={props.deadline} onChanged={props.onChanged} oldText={props.oldText} setShow={props.setShow} id={props.id} />
        <button className="close-btn" onClick={() => props.setShow(false)}>Close</button>
      </div>
    </div>
  ) : '';
}

export default ChangePopup
