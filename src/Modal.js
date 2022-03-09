import ReactModal from "react-modal";
import Form from "./Form"

ReactModal.setAppElement('#root');


const customStyles = {
    content: {
      width: '50%',
      height: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'lightgreen',
      zIndex: '5',
    },
  };
  


function Modal(props) {
    return (
        <div>
            <ReactModal
              isOpen={props.showModal}
              style={customStyles}
              contentLabel={'Calendar form'}
              onRequestClose={props.handleCloseModal}
            >
            <div>
              <Form
                handleSubmitForm={props.handleSubmitForm}
                handleUpdateForm={props.handleUpdateForm}
                onDelete={props.onDelete}
                onTitleChange={props.onTitleChange}
                onDateChange={props.onDateChange}
                onDurationChange={props.onDurationChange}
                updatable={props.updatable}
                id={props.id}
                title={props.title}
                start={props.start}
                end={props.end}
              />
            </div>


            <button id='btn-close' onClick={props.handleCloseModal}>X</button>

            </ReactModal>
            
        </div>

    )    
    
  }


export default Modal;