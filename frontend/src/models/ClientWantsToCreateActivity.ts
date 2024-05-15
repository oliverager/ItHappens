import {BaseDto} from "./baseDto";

export class ClientWantsToCreateActivity extends BaseDto<ClientWantsToCreateActivity> {
  activityImage?: string;
  category?: string;
  location?: number;
  address?: string;
  association?: string;
  booking?: Date;
  activityId?: number;
}
