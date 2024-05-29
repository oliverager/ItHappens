using System.Text.Json;
using Fleck;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsEventIdsForUserDto : BaseDto
{
    public int UserId { get; set; }
}


public class ClientWantsEventIdsForUser : BaseEventHandler<ClientWantsEventIdsForUserDto>
{
    private readonly EventService _eventService;

    public ClientWantsEventIdsForUser(EventService eventService)
    {
        _eventService = eventService;
    }

    public override Task Handle(ClientWantsEventIdsForUserDto dto, IWebSocketConnection socket)
    {
        try
        {
            var eventIds = _eventService.GetEventIdsForUser(dto.UserId);
            var response = new
            {
                eventType = "EventIdsForUser",
                userId = dto.UserId,
                eventIds = eventIds
            };
            socket.Send(JsonSerializer.Serialize(response));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            socket.Send(JsonSerializer.Serialize(new { eventType = "error", msg = "Failed to retrieve events for Server " + dto.UserId }));
            throw;
        }
        return Task.CompletedTask;
    }
}
public class EventIdsForUserMessage
{
    public string EventType { get; set; } = "EventIdsForUser";
    public int UserId { get; set; }
    public IEnumerable<int> EventIds { get; set; }
}
