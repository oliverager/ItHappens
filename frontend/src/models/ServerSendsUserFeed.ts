import {BaseDto} from "./baseDto";
import {User} from "./entities";

export class ServerSendsUserFeed extends BaseDto<ServerSendsUserFeed> {
  UserFeedQueries?: User[];
}
