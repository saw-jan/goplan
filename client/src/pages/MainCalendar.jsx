import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Grid, Menu, Segment, Sidebar, Icon } from 'semantic-ui-react'
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
  const [isSideBar, setIsSideBar] = useState(false)
  const getPanelStatus = useSelector((state) => state.panel.getEventsPanel)
  const dispatch = useDispatch()

  const handleClosePanel = () => {
    setShowPanelCreate(false)
    dispatch(setGetEventsPanel(false))
    setCalendarSize(15)
    setIsSideBar(false)
  }

  const handleShowPanel = () => {
    setShowPanelCreate(true)
    dispatch(setGetEventsPanel(false))
    setCalendarSize(11)
    setIsSideBar(true)
  }

  getAllEvents()

  return (
    <div className="cal-wrapper">
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
            icon="close"
            onClick={handleClosePanel}
            floated="right"
            size="small"
            title="Close"
          />
          <CreateEventWrapper />
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
            icon="close"
            onClick={handleClosePanel}
            floated="right"
            size="small"
            title="Close"
          />
          <GetEvents />
        </Sidebar>
        <Sidebar.Pusher>
          <div className="background">
            <Grid className="go-calender">
              <Grid.Row>
                <Grid.Column>
                  {isSideBar ? (
                    <Button onClick={handleShowPanel}>
                      <Icon name="plus" size="small" />
                      <span>Create Event</span>
                    </Button>
                  ) : (
                    <Button onClick={handleShowPanel}>
                      <Icon name="plus" size="small" />
                      <span>Create Event</span>
                    </Button>
                  )}
                </Grid.Column>
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
    </div>
  )
}

MainCalendar.propTypes = {}

export default MainCalendar
