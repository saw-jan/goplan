import {
  EVENT_URL,
  EVENT_STATUSES,
  CREATE_EVENT_ERRORS,
  CREATE_EVENT_ERROR_MESSAGES,
} from './constants'
import { getJwtToken } from '../users/jwt'
import store from 'src/store'
import {
  setCreatedEvent,
  setCreateEventErrorMsg,
  setCreateEventStatus,
} from 'src/store/action-creators/events'

/**
 *
 * @param eventObj {{startDateTime: *, name: *, description: *, location: *, endDateTime: *}}
 */
async function createEvent(eventObj) {
  const jwtToken = getJwtToken()
  let jsonResp

  store.dispatch(setCreateEventStatus(EVENT_STATUSES.PENDING))
  try {
    const resp = await fetch(EVENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authentication: `bearer: ${jwtToken}`,
      },
      body: JSON.stringify({
        event: eventObj,
      }),
    })

    jsonResp = await resp.json()
  } catch (e) {
    store.dispatch(setCreateEventStatus(EVENT_STATUSES.FAILED))
    store.dispatch(setCreateEventErrorMsg(CREATE_EVENT_ERRORS.SERVER_ERROR))
    return
  }

  if (jsonResp.error) {
    switch (jsonResp.error) {
      case CREATE_EVENT_ERRORS.BAD_EVENT_GIVEN:
        store.dispatch(setCreateEventStatus(EVENT_STATUSES.FAILED))
        store.dispatch(
          setCreateEventErrorMsg(CREATE_EVENT_ERROR_MESSAGES.BAD_EVENT_GIVEN)
        )
        return
      default:
        store.dispatch(setCreateEventStatus(EVENT_STATUSES.FAILED))
        store.dispatch(
          setCreateEventErrorMsg(CREATE_EVENT_ERROR_MESSAGES.SERVER_ERROR)
        )
        return
    }
  }

  if (!jsonResp.event) {
    store.dispatch(setCreateEventStatus(EVENT_STATUSES.FAILED))
    store.dispatch(setCreateEventErrorMsg(CREATE_EVENT_ERRORS.SERVER_ERROR))
    return
  }
  store.dispatch(setCreateEventStatus(EVENT_STATUSES.SUCCESS))
  store.dispatch(setCreateEventErrorMsg(null))
  store.dispatch(setCreatedEvent(jsonResp.event))
}

export default createEvent
