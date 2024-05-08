import {BaseDto} from "./baseDto";

export class ClientWantsToCreateAssociations extends BaseDto<ClientWantsToCreateAssociations> {
  name?: string;
  email?: string;
  telephone?: number;
  address?: string;
  description?: string;
}
