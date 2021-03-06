import { Request, Response } from 'express'
import { insertOne, deleteOne } from '../models/Event'
import { findEvents, IEvent } from '../models/Event'

export const ERROR_MSGS = {
  SERVER_ERROR: 'Undefined server Error.',
  BAD_EVENT_GIVEN:
    'New event object is either missing, ' +
    'missing props, or props have incorrect type in request body.',
  BAD_ID_GIVEN: 'userId is either missing, or is of incorrect type.',
  BAD_MONTH_GIVEN: 'month param is either missing, or is of incorrect type.',
}

export async function createEvent(
  req: Request,
  res: Response
): Promise<Response> {
  const event: IEvent = req.body.event

  try {
    const newEvent = await insertOne(event)
    return res.status(200).json({ event: newEvent })
  } catch (e) {
    return res.status(400).json({ error: ERROR_MSGS.SERVER_ERROR })
  }
}

export async function deleteEvent(
  req: Request,
  res: Response
): Promise<Response> {
  const event: IEvent = req.body

  try {
    await deleteOne(event)
    return res.status(200).json({ message: 'Event deleted' })
  } catch (e) {
    let err = ERROR_MSGS.SERVER_ERROR
    if (typeof e === 'object' && 'message' in e) err = e.message

    return res.status(400).json({ error: err })
  }
}

export async function getUserEvents(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = req.body.userId
  let userEvents
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: ERROR_MSGS.BAD_ID_GIVEN })
  }

  try {
    userEvents = await findEvents({ userId })
    return res.status(200).json({
      events: userEvents,
    })
  } catch (e) {
    return res.status(400).json({ error: ERROR_MSGS.SERVER_ERROR })
  }
}
