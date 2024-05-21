using System.Text.Json;
using Fleck;
using infrastructure.Models.QueryModels;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToGetEventFeedDto : BaseDto;

public class ServerSendsEventFeedDto : BaseDto
{
    public IEnumerable<EventsFeedQuery> EventsFeedQueries { get; set; }
}

public class ClientWantsToGetEventFeed(EventService eventService) : BaseEventHandler<ClientWantsToGetEventFeedDto>
{
    public override async Task Handle(ClientWantsToGetEventFeedDto dto, IWebSocketConnection socket)
        => socket.Send(JsonSerializer.Serialize(new ServerSendsEventFeedDto()
        {
            EventsFeedQueries = eventService.GetEventFeed()
        }));
}