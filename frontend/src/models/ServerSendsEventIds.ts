import {BaseDto} from "./baseDto";

export class ServerSendsEventIds extends BaseDto<ServerSendsEventIds>{
  EventIdsQueries!: number[]
}
