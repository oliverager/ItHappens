import {BaseDto} from "./baseDto";

export class ClientWantsToLogIn extends BaseDto<ClientWantsToLogIn> {
  username?: string;
  password?: string;
}
