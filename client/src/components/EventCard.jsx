import PropTypes from 'prop-types'
import { Card, Button, Grid, Icon } from 'semantic-ui-react'
import downloadSingleIcsEvent from 'src/api/downloadSingleIcsEvent'
import deleteEventRequest from 'src/api/events/deleteEvent'

export default function EventCard({ event }) {
  const startDate = new Date(event.startDateTime)
  const endDate = new Date(event.endDateTime)

  const startTime = startDate.toLocaleTimeString()
  const endTime = endDate.toLocaleTimeString()

  function handleDownload() {
    downloadSingleIcsEvent(event)
  }

  function handleDelete(event) {
    deleteEventRequest(event)
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header textAlign="left"> {event.name}</Card.Header>
        <Card.Meta textAlign="left">{event.location}</Card.Meta>
        <Card.Description textAlign="left">
          {event.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="left">
        Time: {startTime} - {endTime}
      </Card.Content>
      <Grid.Row className="btn-row cal-card">
        <Button onClick={handleDownload}>Export Event</Button>
        <Button onClick={() => handleDelete(event)}>
          <Icon name="trash alternate outline" size="big" />
        </Button>
      </Grid.Row>
    </Card>
  )
}

EventCard.propTypes = {
  event: PropTypes.object,
}
