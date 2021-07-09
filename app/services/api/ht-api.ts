import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetEventsResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"


export class EventsApi {
  private api: Api
  private next?: string 
  private previous?: string 

  constructor(api: Api) {
    this.api = api
  }

  async getEvents(): Promise<GetEventsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://api.hackathonturkiye.com/events/?status=ongoing",
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const events = response.data.results
      this.next = response.data.next
      this.previous = response.data.previous

      return { kind: "ok", events }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getNextPage(): Promise<GetEventsResult> {
    try {
      if (!this.next) console.log('End-of-data')
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.next
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const events = response.data.results
      this.next = response.data.next
      this.previous = response.data.previous

      return { kind: "ok", events }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
