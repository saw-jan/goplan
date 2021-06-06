import { useEffect, useState } from 'react'
import { Button, Header, Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import downloadMultiIcsEvent from 'src/api/downloadMultiIcsEvent'
import DownloadEventsByDay from './DownloadEventsByDay'
import EventCard from './EventCard'

function getRelevantDailyEvents(dailyEvents, selectedDate) {
  const events = []
  const selectedDateObj = new Date(selectedDate)
  dailyEvents.forEach((event) => {
    if (selectedDateObj >= new Date(event.startDateTime)) {
      events.push(event)
    }
  })
  return events
}

function GetEvents() {
  const events = useSelector((state) => state.events.allEvents)
  const [currentEvents, setCurrentEvents] = useState([])
  const selectedDate = useSelector((state) => state.calendar.selectedDate)

  useEffect(() => {
    if (!selectedDate) {
      return
    }
    if (!events || !events.daily) {
      setCurrentEvents([])
      return
    }

    let oneTimeEvents = []

    if (events[selectedDate]) {
      oneTimeEvents = events[selectedDate]
    }

    const dailyEvents = getRelevantDailyEvents(events.daily, selectedDate)

    setCurrentEvents([...oneTimeEvents, ...dailyEvents])
  }, [events, setCurrentEvents, selectedDate])

  const handleDownloadEventsByDay = () => {
    if (events) {
      downloadMultiIcsEvent(currentEvents, selectedDate)
    }
  }

  return (
    <Grid className="event-form">
      <Grid.Row>
        <Header style={{ margin: 0 }}>{selectedDate}</Header>
        {currentEvents.map((event) => (
          <EventCard event={event} key={event.name} />
        ))}
        <br />
        <Grid.Row className="btn-row">
          <DownloadEventsByDay events={events} />
          <Button onClick={handleDownloadEventsByDay}>Download All</Button>
        </Grid.Row>
      </Grid.Row>
    </Grid>
  )
}

export default GetEvents
