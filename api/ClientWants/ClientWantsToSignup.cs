using System.Text.Json;
using api.State;
using Fleck;
using lib;

namespace api.ClientWants;

public class ClientWantsToSignupDto : BaseDto
{
    public string username { get; set; }
    public string password { get; set; }
    public string email { get; set; }
    public int tel { get; set; }
    
}

public class ClientWantsToSignup : BaseEventHandler<ClientWantsToSignupDto>
{
    public override Task Handle(ClientWantsToSignupDto dto, IWebSocketConnection socket)
    {
        // Set the username for the socket connection
        WebSocketStateService.Connections[socket.ConnectionInfo.Id].Username = dto.username;

        // Create a personalized welcome message
        var welcomeMessage = new ServerWelcomesUser(dto.username);

        // Send the welcome message serialized as JSON
        socket.Send(JsonSerializer.Serialize(welcomeMessage));

        return Task.CompletedTask;
    }
}

public class ServerWelcomesUser
{
    public string Message { get; set; }
    public ServerWelcomesUser(string username)
    {
        Message = $"Welcome to the platform, {username}!";
    }
}

