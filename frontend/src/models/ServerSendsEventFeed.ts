import {BaseDto} from "./baseDto";
import {Event} from "./entities"

export class ServerSendsEventFeed extends BaseDto<ServerSendsEventFeed> {
  EventsFeedQueries?: Event[];
}
