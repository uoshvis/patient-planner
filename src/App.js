import React, {useState} from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import initialEvents from './events';
import './App.css';
import Modal from './Modal';


require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


function App() {

  const initialEventState = { id: null, tile: '', start: '', end: '' }

  const [events, setEvents] = useState(initialEvents)
  const [currentEvent, setCurrentEvent] = useState(initialEventState)
  const [showModal, setShowModal] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)


  const handleSelectSlot = ({ start }) => {
    
    setShowModal(true)
    setUpdateMode(false)
    const newEnd = moment(start).add(Number(30), 'm').toDate()
    setCurrentEvent({...currentEvent, start: start, end: newEnd})
  }

  const handeleSelectEvent = ({ id, title, start, end }) => {    
    setShowModal(true)
    setUpdateMode(true)
    setCurrentEvent({id: id, title: title, start: start, end: end})
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setUpdateMode(false)
    setCurrentEvent(initialEventState)
  }

  const addEvent = (event) => {
    event.id = Date.now()

    setEvents([...events, event])
    setShowModal(false)
    setUpdateMode(false)
  }

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map((event) => (event.id === id ? updatedEvent : event)))
    setShowModal(false)
    setUpdateMode(false)
  }
  
  const deleteEvent = id => {
    setShowModal(false)
    setUpdateMode(false)
    setEvents(events.filter(event => event.id !== id))
  }


  return (
    <div className="App">
        <Calendar
          selectable
          localizer={localizer}
          style={{ height: 800 }}
          events={events}
          defaultView={Views.MONTH}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handeleSelectEvent}
        />

        {showModal &&

          <Modal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            updateMode={updateMode}
            addEvent={addEvent}
            updateEvent={updateEvent}
            deleteEvent={deleteEvent}
            currentEvent={currentEvent}
          />
        } 
    </div>
  )
}


export default App;
