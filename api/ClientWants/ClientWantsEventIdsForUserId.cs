using System.Text.Json;
using Fleck;
using infrastructure.Models.QueryModels;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsEventIdsForUserDto : BaseDto
{
    public int UserId { get; set; }
}
public class ClientWantsEventIdsForUserId : BaseEventHandler<ClientWantsEventIdsForUserDto>
{
    private readonly EventService _eventService;
    public ClientWantsEventIdsForUserId(EventService eventService)
    {
        _eventService = eventService;
    }
    public override Task Handle(ClientWantsEventIdsForUserDto dto, IWebSocketConnection socket)
    {
        try
        {
            socket.Send(JsonSerializer.Serialize(new ServerSendsEventIdsDto()
            {
                EventIdsQueries = _eventService.GetEventIdsForUser(dto.UserId)
            }));
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

public class ServerSendsEventIdsDto : BaseDto
{
    public IEnumerable<int>? EventIdsQueries { get; set; }
}