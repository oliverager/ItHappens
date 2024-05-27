

using System.Text.Json;
using Fleck;
using lib;

namespace api.ClientWants;

public class ClientWantsToCreateEventDto : BaseDto
{
    public string Image { get; set; }
    public string Category { get; set; }
    public string Location { get; set; }
    public string Address { get; set; }
    public string Association { get; set; }
    public string Booking { get; set; }
    public int activityId { get; set; }
}

public class ClientWantsToCreateEvent : BaseEventHandler<ClientWantsToCreateEventDto>
{
    public override Task Handle(ClientWantsToCreateEventDto dto, IWebSocketConnection socket)
    {
        var response = new
        {
            Image = dto.Image,
            Category = dto.Category,
            Address = dto.Address,
            Location = dto.Location,
            Association = dto.Association,
            Booking = dto.Booking,
        };
        string jsonResponse = JsonSerializer.Serialize(response);

        socket.Send(jsonResponse);
        return Task.CompletedTask;
    }
    
}
    
