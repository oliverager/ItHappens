import {BaseDto} from "./baseDto";
import {Association} from "./entities";

export class ServerSendsAssociationFeed extends BaseDto<ServerSendsAssociationFeed> {
  AssociationsFeedQueries?: Association[];
}
