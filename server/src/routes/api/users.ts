import Express from 'express'
import { create, remove, login, getAll } from '../../controllers/users'
import protectController from '../../middleware/protectController'

const router = Express.Router()

const USERS = '/users'

export const PATHS = {
  LOGIN: `${USERS}/login`,
  GET_ALL: `${USERS}/get-all`,
}

router.post(USERS, create)
router.post(PATHS.GET_ALL, protectController(getAll, true))
router.post(PATHS.LOGIN, login)
router.delete(USERS, remove)

export default router
