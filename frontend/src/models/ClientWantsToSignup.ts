import {BaseDto} from "./baseDto";

export class ClientWantsToSignup extends BaseDto<ClientWantsToSignup> {
  userName?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phoneNumber?: number;
  userType?: number;
}
