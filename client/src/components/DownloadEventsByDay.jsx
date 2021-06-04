import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

function DownloadEventsByDay({ events }) {
  const handleDownload = () => {
    console.log({ events })
  }

  return (
    <>
      <Button onClick={handleDownload}> Export </Button>
    </>
  )
}

DownloadEventsByDay.propTypes = {
  events: PropTypes.any.isRequired,
}
export default DownloadEventsByDay
