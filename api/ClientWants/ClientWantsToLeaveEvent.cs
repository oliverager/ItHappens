using System.Text.Json;
using api.State;
using Fleck;
using lib;
using Newtonsoft.Json;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToLeaveEventDto : BaseDto
{
    public int userId { get; set; }
    public int eventId { get; set; }
}

public class ClientWantsToLeaveEvent : BaseEventHandler<ClientWantsToLeaveEventDto>
{
    private readonly EventService _eventService;
        
    public ClientWantsToLeaveEvent(EventService eventService)
    {
        _eventService = eventService;
        
    }
    public override Task Handle(ClientWantsToLeaveEventDto dto, IWebSocketConnection socket)
    {
        Console.WriteLine("you started it bruv");
    
        
        try
        {
            var response = new { success = true, eventType = "ClientWantsToLeaveEvent" };


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