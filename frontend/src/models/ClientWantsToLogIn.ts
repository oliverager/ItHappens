import {BaseDto} from "./baseDto";

export class ClientWantsToLogIn extends BaseDto<ClientWantsToLogIn> {
  email?: string;
  password?: string;
}
