using System.Text.Json;
using Fleck;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToGetEventFeedDto : BaseDto;

public class ClientWantsToGetEventFeed(EventService eventService) : BaseEventHandler<ClientWantsToGetEventFeedDto>
{
    public override async Task Handle(ClientWantsToGetEventFeedDto dto, IWebSocketConnection socket)
        => socket.Send(JsonSerializer.Serialize(eventService.GetEventFeed()));
}