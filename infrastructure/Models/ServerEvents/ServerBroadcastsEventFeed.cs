using infrastructure.Models.QueryModels;
using lib;

namespace infrastructure.Models.ServerEvents;

public class ServerBroadcastsEventFeed : BaseDto
{
    public EventsFeedQuery? EventQuery { get; set; }
}