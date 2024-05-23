import {BaseDto} from "./baseDto";

export class ClientWantsToSignupOwner extends BaseDto<ClientWantsToSignupOwner> {
  userName?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phoneNumber?: number;
  userType?: number;
  association_id?: number;
}
