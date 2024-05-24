using System.Text.Json;
using api.State;
using Fleck;
using lib;
using Newtonsoft.Json;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToAttendEventDto : BaseDto
{
    public int userId { get; set; }
    public int eventId { get; set; }
}

public class ClientWantsToAttendEvent : BaseEventHandler<ClientWantsToAttendEventDto>
{
    private readonly EventService _eventService;
        
    public ClientWantsToAttendEvent(EventService eventService)
        {
        _eventService = eventService;
        
        }
    public override Task Handle(ClientWantsToAttendEventDto dto, IWebSocketConnection socket)
    {
        Console.WriteLine("you started it bruv");
    
        
        try
        {
            _eventService.CreateBooking(dto.userId, dto.eventId);
            
            var response = new {success = true, eventType = "ClientWantsToAttendEvent" };


            // Serialize the JSON object to a string
            var jsonResponse = JsonConvert.SerializeObject(response);

            // Send the JSON response back to the client
            socket.Send(jsonResponse);
        }
        catch
        {
            var response = new { success = false};
            
        }
      
        return Task.CompletedTask;
    }
    
}


