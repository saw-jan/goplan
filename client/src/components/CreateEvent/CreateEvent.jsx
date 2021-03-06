import { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  Select,
  Header,
  Message,
  TextArea,
  Grid,
} from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react'
import { useDispatch } from 'react-redux'
import { setCreateEventErrorMsg } from 'src/store/action-creators/events'
import 'src/css/style.css'

function CreateEvent({
  eventFields,
  eventFieldHandler,
  onSubmit,
  errorMsg,
  recurringOptions,
}) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCreateEventErrorMsg(null))
  }, [dispatch])

  return (
    <>
      <div className="panelStyle">
        <Grid className="event-form">
          <Grid.Row>
            <Form>
              {errorMsg ? <Message negative>{errorMsg}</Message> : null}
              <Header as="h1">New Event</Header>
              <TextArea
                name="name"
                value={eventFields.name}
                onChange={eventFieldHandler}
                rows={1}
                placeholder="Name of event"
              />
              <br />
              <br />
              <TextArea
                name="description"
                value={eventFields.description}
                onChange={eventFieldHandler}
                rows={1}
                placeholder="Description"
              />
              <br />
              <br />
              <TextArea
                name="location"
                value={eventFields.location}
                onChange={eventFieldHandler}
                rows={1}
                placeholder="Location"
              />
              <br />
              <br />
              <DateInput
                closable
                name="date"
                placeholder="Date"
                value={eventFields.date}
                iconPosition="left"
                onChange={eventFieldHandler}
              />
              <TimeInput
                closable
                name="startTime"
                placeholder="Time Start"
                value={eventFields.startTime}
                iconPosition="left"
                onChange={eventFieldHandler}
              />
              <TimeInput
                closable
                name="endTime"
                placeholder="Time End"
                value={eventFields.endTime}
                iconPosition="left"
                onChange={eventFieldHandler}
              />
              <Select
                placeholder="Repeat every..."
                name="recurrenceType"
                fluid
                selection
                options={recurringOptions}
                onChange={eventFieldHandler}
                value={eventFields.recurrenceType}
              />
            </Form>
          </Grid.Row>
          <Grid.Row className="btn-row">
            <Button onClick={onSubmit}>Add Event</Button>
          </Grid.Row>
        </Grid>
      </div>
    </>
  )
}

CreateEvent.propTypes = {
  eventFields: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    recurrenceType: PropTypes.string,
  }).isRequired,
  eventFieldHandler: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  recurringOptions: PropTypes.array,
}
export default CreateEvent
