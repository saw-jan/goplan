import { EVENT_URL, EVENT_STATUSES } from './constants'
import { getJwtToken } from '../users/jwt'
import store from 'src/store'
import {
  setUpdatedEvents,
  setDeleteEventStatus,
} from 'src/store/action-creators/events'

/**
 *
 * @param eventObj {{startDateTime: *, name: *, description: *, location: *, endDateTime: *}}
 */
async function deleteEvent(eventObj) {
  const jwtToken = getJwtToken()
  let jsonResp

  store.dispatch(setDeleteEventStatus(EVENT_STATUSES.PENDING))
  try {
    const resp = await fetch(EVENT_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authentication: `bearer: ${jwtToken}`,
      },
      body: JSON.stringify({
        _id: eventObj._id,
        userId: eventObj.userId,
      }),
    })

    jsonResp = await resp.json()
  } catch (e) {
    store.dispatch(setDeleteEventStatus(EVENT_STATUSES.FAILED))
    return
  }

  if (jsonResp.error) {
    store.dispatch(setDeleteEventStatus(jsonResp.error))
    return
  }
  store.dispatch(setDeleteEventStatus(EVENT_STATUSES.SUCCESS))
  store.dispatch(setUpdatedEvents(eventObj._id))
}

export default deleteEvent
