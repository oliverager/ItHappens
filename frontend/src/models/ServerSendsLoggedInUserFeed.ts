import {BaseDto} from "./baseDto";
import {User} from "./entities";

export class ServerSendsLoggedInUserFeed extends BaseDto<ServerSendsLoggedInUserFeed> {
  UsersFeedQueries?: User[];
}
