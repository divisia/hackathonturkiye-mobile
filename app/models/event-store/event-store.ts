import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EventModel, EventSnapshot } from "../event/event"
import { EventsApi } from "../../services/api/ht-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing events published on Hackathon Türkiye
 */
export const EventStoreModel = types
  .model("EventStore")
  .props({
    events: types.optional(types.array(EventModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveEvents: (eventSnapshots: EventSnapshot[]) => {
      self.events.replace(eventSnapshots)
    },
  }))
  .actions((self) => ({
    getEvents: async () => {
      const eventsApi = new EventsApi(self.environment.api)
      const result = await eventsApi.getEvents()

      if (result.kind === "ok") {
        self.saveEvents(result.events)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type EventStoreType = Instance<typeof EventStoreModel>
export interface EventStore extends EventStoreType {}
type EventStoreSnapshotType = SnapshotOut<typeof EventStoreModel>
export interface EventStoreSnapshot extends EventStoreSnapshotType {}
export const createEventStoreDefaultModel = () => types.optional(EventStoreModel, {})
