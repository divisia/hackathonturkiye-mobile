import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Hackathon Türkiye API event model
 */


const EType = types.model('EventType').props({
    name: types.string,
    url: types.maybeNull(types.string)
})

const Tag = types.model('Tag').props({
    name: types.string,
    slug: types.string,
})

export const EventModel = types.model("Event").props({
  name: types.string,
  location: types.string,
  thumbnail: types.string,
  prize: types.maybeNull(types.string),
  etype: EType,
  tags: types.array(Tag),
  deadline: types.string,
  starts_at: types.string,
  ends_at: types.string,
  slug: types.string,
  is_applicable: types.boolean,
  url: types.string,
  description: types.string,
  has_details: types.boolean,
})

type EventType = Instance<typeof EventModel>
export interface Event extends EventType {}
type EventSnapshotType = SnapshotOut<typeof EventModel>
export interface EventSnapshot extends EventSnapshotType {}
export const createEventDefaultModel = () => types.optional(EventModel, {})
