using System.Text.Json;
using Fleck;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToCreateEventDto : BaseDto
{
    public string? Name { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    public int Price { get; set; }
    public int AssociationId { get; set; }
    public int CategoryId { get; set; }
    public int BookingId { get; set; }
}

public class ClientWantsToCreateEvent : BaseEventHandler<ClientWantsToCreateEventDto>
{
    private readonly EventService _eventService;

    public ClientWantsToCreateEvent(EventService eventService)
    {
        _eventService = eventService;
    }

    public override Task Handle(ClientWantsToCreateEventDto dto, IWebSocketConnection socket)
    {
        try
        {
            _eventService.CreateEvent(dto.Name, dto.Location, dto.ImageUrl, dto.Description, dto.Date, dto.Amount,
                dto.Price, dto.AssociationId, dto.CategoryId, dto.BookingId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            socket.Send(JsonSerializer.Serialize(new { eventType = "error", msg = "Failed to add " + dto.Name }));
            throw;
        }

        return Task.CompletedTask;
    }
}