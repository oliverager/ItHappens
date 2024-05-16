import {BaseDto} from "./baseDto";

export class ClientWantsToCreateEvent extends BaseDto<ClientWantsToCreateEvent> {
  activityImage?: string;
  category?: string;
  location?: number;
  address?: string;
  association?: string;
  booking?: Date;
  activityId?: number;
}
