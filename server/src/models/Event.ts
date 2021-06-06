import { getDb } from '../db'
import { findOne as findOneUser } from './User'
import {
  Cursor,
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  ObjectID,
  FilterQuery,
} from 'mongodb'
import { QueryError } from './errors'
export { UserNotFound } from './User'

export const EVENTS = 'events'

// interface keys
const ID = '_id'
const USER_ID = 'userId'
const DESCRIPTION = 'description'
const LOCATION = 'location'
const START_DATE_TIME = 'startDateTime'
const END_DATE_TIME = 'endDateTime'

// string used for dateCheck
const INVALID_DATE = 'Invalid Date'

export enum Recurrences {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface IEvent {
  _id?: string | ObjectID
  userId: string | ObjectID
  name: string
  description: string
  location: string
  startDateTime: string
  endDateTime: string
  recurrenceType: Recurrences
}

export interface IEventQueryFilter {
  _id?: string | ObjectID
  userId?: string | ObjectID
  name?: string
  description?: string
  location?: string
  startDateTime?: string
  endDateTime?: string
  recurrenceType?: Recurrences
}

export class EventNotFound extends Error {
  constructor() {
    super('No event was found')
  }
}

export async function findOne(filter: IEventQueryFilter): Promise<IEvent> {
  let foundEvent: IEvent | null = null
  const db = getDb()

  if (filter._id && typeof filter._id === 'string') {
    filter._id = new ObjectID(filter._id)
  }

  try {
    foundEvent = await db.collection(EVENTS).findOne(filter)
  } catch (e) {
    throw new QueryError()
  }

  if (!foundEvent) {
    throw new EventNotFound()
  }
  return foundEvent
}

export async function insertOne(event: IEvent): Promise<IEvent> {
  const db = getDb()
  let queryResult: InsertOneWriteOpResult<IEvent & { _id: string }>

  if (typeof event.userId === 'string') {
    event.userId = new ObjectID(event.userId)
  }

  try {
    await findOneUser({ _id: event.userId })
  } catch (e) {
    throw e
  }

  try {
    queryResult = await db.collection(EVENTS).insertOne(event)
  } catch (e) {
    throw new QueryError()
  }

  if (queryResult.insertedCount !== 1) throw new QueryError()

  return queryResult.ops[0]
}

export async function deleteOne(event: IEvent): Promise<any> {
  const db = getDb()
  let queryResult: DeleteWriteOpResultObject

  if (typeof event._id === 'string') {
    event._id = new ObjectID(event._id)
  }

  if (typeof event.userId === 'string') {
    event.userId = new ObjectID(event.userId)
  }

  try {
    await findOne({ _id: event._id, userId: event.userId })
  } catch (e) {
    throw e
  }

  try {
    queryResult = await db.collection(EVENTS).deleteOne(event)
  } catch (e) {
    throw new QueryError()
  }

  if (queryResult.deletedCount !== 1) {
    throw new QueryError()
  }
}

export async function findEvents(
  queryObject: FilterQuery<IEvent>
): Promise<IEvent[]> {
  let queryRes: Cursor<IEvent>

  const db = getDb()

  if (typeof queryObject._id === 'string') {
    queryObject = { ...queryObject, _id: new ObjectID(queryObject._id) }
  }
  if (typeof queryObject.userId === 'string') {
    queryObject = { ...queryObject, userId: new ObjectID(queryObject.userId) }
  }
  try {
    queryRes = await db.collection(EVENTS).find(queryObject)
    const events = await queryRes.toArray()
    return events
  } catch (e) {
    throw new QueryError()
  }
}

export function isIEvent(obj: any): obj is IEvent {
  /* has shape not working for this for some reason
    const hasCorrectShape = hasShape(obj, {
        _id: {isRequired: false, type: 'string'},
        userId: {isRequired: true, type: 'string'},
        description: {isRequired: true, type: 'string'},
        location: {isRequired: true, type: 'string'},
        startDateTime: {isRequired: true, type: 'string'},
        endDateTime: {isRequired: true, type: 'string'}
    });
    */

  // quick fix since hasShape is not working;
  if (!obj.userId || typeof obj.userId !== 'string') {
    return false
  }

  if (!obj.description || typeof obj.description !== 'string') {
    return false
  }

  if (!obj.location || typeof obj.location !== 'string') {
    return false
  }

  if (!obj.startDateTime || typeof obj.startDateTime !== 'string') {
    return false
  }

  if (!obj.endDateTime || typeof obj.endDateTime !== 'string') {
    return false
  }

  if (new Date(obj[START_DATE_TIME]).toString() === INVALID_DATE) {
    return false
  }

  if (new Date(obj[END_DATE_TIME]).toString() === INVALID_DATE) {
    return false
  }
  return true
}
