import {BaseDto} from "./baseDto";

export class ClientWantsToAttendEvent extends BaseDto<ClientWantsToAttendEvent> {
  userId?: number;
  eventId?: number;
}
