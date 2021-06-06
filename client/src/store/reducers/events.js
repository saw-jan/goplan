import { setUpdatedEvents } from '../action-creators/events'
import {
  SET_CREATE_EVENT_ERROR_MSG,
  SET_CREATE_EVENT_STATUS,
  SET_DELETE_EVENT_STATUS,
  SET_CREATED_EVENT,
  SET_ALL_EVENTS,
  SET_UPDATED_EVENTS,
  SET_IS_RECURRING,
} from '../action-types/events'

const defaultState = {
  createEventStatus: null,
  deleteEventStatus: null,
  createEventErrorMsg: null,
  createdEvent: null,
  isRecurring: null,
  allEvents: {},
}

function eventsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CREATE_EVENT_STATUS:
      return { ...state, createEventStatus: action.payload }
    case SET_CREATE_EVENT_ERROR_MSG:
      return { ...state, createEventErrorMsg: action.payload }
    case SET_CREATED_EVENT:
      return { ...state, createdEvent: action.payload }
    case SET_ALL_EVENTS:
      return { ...state, allEvents: action.payload }
    case SET_UPDATED_EVENTS:
      const updatedEvents = removeEvent(state.allEvents, action.payload)
      return { ...state, allEvents: updatedEvents }
    case SET_IS_RECURRING:
      return { ...state, isRecurring: action.payload }
    case SET_DELETE_EVENT_STATUS:
      return { ...state, deleteEventStatus: action.payload }
    default:
      return state
  }
}

function removeEvent(eventObj, eventId) {
  const newEventList = {}
  let index = 0
  const eventArr = Object.values(eventObj)
  const eventCats = Object.keys(eventObj)
  eventArr.forEach((list) => {
    const arr = Object.values(list).filter((e) => e._id !== eventId)
    newEventList[eventCats[index]] = arr
    index++
  })
  return newEventList
}

export default eventsReducer
