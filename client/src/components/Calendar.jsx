import { DateInput } from 'semantic-ui-calendar-react'
import { useDispatch, useSelector } from 'react-redux'
import getDateString from 'src/api/events/getDateString'
import { setSelectedDate } from 'src/store/action-types/calendar'
import { setGetEventsPanel } from 'src/store/action-types/panel'

function Calendar() {
  const date = useSelector((state) => state.calendar.selectedDate)
  const dispatch = useDispatch()

  const dateHandler = (event, { value }) => {
    const [day, month, year] = value.split('-')
    const dateObj = new Date()
    dateObj.setFullYear(year)
    dateObj.setMonth(parseInt(month) - 1)
    dateObj.setDate(day)
    dispatch(setGetEventsPanel(true))
    const dateStr = getDateString(dateObj)
    dispatch(setSelectedDate(dateStr))
  }

  return (
    <>
      <DateInput
        inline
        name="date"
        placeholder="Date"
        value={date}
        iconPosition="left"
        onChange={dateHandler}
      />
    </>
  )
}

export default Calendar
