import Express from 'express'
import {
  createEvent,
  deleteEvent,
  getUserEvents,
} from '../../controllers/events'
import protectController from '../../middleware/protectController'

const router = Express.Router()

const EVENTS = '/events'

export const PATHS = {
  EVENTS: `${EVENTS}`,
  GET_BY_USER: `${EVENTS}/get-by-user`,
}

router.delete(PATHS.EVENTS, protectController(deleteEvent, false))
router.post(PATHS.EVENTS, protectController(createEvent, false))
router.post(PATHS.GET_BY_USER, protectController(getUserEvents, false))
export default router
