using System.Text.Json;
using Fleck;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToDeleteUserDto: BaseDto
{
    public int userId { get; set; }
    
}
public class ClientWantsToDeleteUser: BaseEventHandler<ClientWantsToDeleteUserDto>
{
    private readonly UserService _userService;

    public ClientWantsToDeleteUser(UserService userService)
    {
        _userService = userService;
    }
    public override Task Handle(ClientWantsToDeleteUserDto dto, IWebSocketConnection socket)
    {
        try
        {
            _userService.DeleteUser(dto.userId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            socket.Send(JsonSerializer.Serialize(new { eventType = "error", msg = "Failed to delete " + dto.userId }));
            throw;
        }
        return Task.CompletedTask;
    }
}