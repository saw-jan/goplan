import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Grid, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Calendar from 'src/components/Calendar'
import NavBar from 'src/components/NavBar'
import CreateEventWrapper from 'src/components/CreateEvent/CreateEventWrapper'
import GetEvents from 'src/components/GetEvents'
import getAllEvents from 'src/api/events/getAllEvents'
import { setGetEventsPanel } from 'src/store/action-types/panel'
import 'src/css/style.css'

function MainCalendar() {
  const [showPanelCreate, setShowPanelCreate] = useState(false)
  const [calendarSize, setCalendarSize] = useState(15)
  const [buttonSize, setButtonSize] = useState(3)
  const getPanelStatus = useSelector((state) => state.panel.getEventsPanel)
  const dispatch = useDispatch()

  const handleClosePanel = () => {
    setShowPanelCreate(false)
    dispatch(setGetEventsPanel(false))
    setCalendarSize(15)
    setButtonSize(3)
  }

  const handleShowPanel = () => {
    setShowPanelCreate(true)
    dispatch(setGetEventsPanel(false))
    setCalendarSize(11)
    setButtonSize(1)
  }

  getAllEvents()

  return (
    <>
      <NavBar />

      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          vertical
          visible={showPanelCreate}
          width="wide"
        >
          <Button
            compact
            basic
            icon="window close"
            onClick={handleClosePanel}
            floated="right"
            size="small"
          />
          {/* <CreateEventWrapper /> */}
        </Sidebar>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          width="wide"
          vertical
          visible={getPanelStatus}
        >
          <Button
            compact
            basic
            icon="window close"
            onClick={handleClosePanel}
            floated="right"
            size="small"
          />
          <GetEvents />
        </Sidebar>

        <Sidebar.Pusher>
          <div className="background">
            <Grid>
              <Grid.Row>
                <Grid.Column width={buttonSize}>
                  <Button onClick={handleShowPanel}>createevents</Button>
                </Grid.Column>
                <Grid.Column width={11}></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={calendarSize}>
                  <Calendar />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  )
}

MainCalendar.propTypes = {
  handleClosePanel: PropTypes.func.isquired,
  showPanel: PropTypes.bool.isRequired,
  calendarSize: PropTypes.number.isRequired,
  handleShowPanel: PropTypes.func.isRequired,
}

export default MainCalendar
