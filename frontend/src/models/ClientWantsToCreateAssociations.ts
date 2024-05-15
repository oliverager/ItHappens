import {BaseDto} from "./baseDto";

export class ClientWantsToCreateAssociations extends BaseDto<ClientWantsToCreateAssociations> {
  id?: number;
  name?: string;
  email?: string;
  phone?: number;
  address?: string;
  description?: string;
  bannerUrl?: string;
  profileUrl?: string;
}
