using System.Text.Json;
using Fleck;
using lib;

namespace api.ClientWants;

public class ClientWantsToCreateAssociationsDto : BaseDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public int Tel { get; set; }
    public string Address { get; set; }
    public string Description { get; set; }
}

public class ClientWantsToCreateAssociations : BaseEventHandler<ClientWantsToCreateAssociationsDto>
{
    public override Task Handle(ClientWantsToCreateAssociationsDto dto, IWebSocketConnection socket)
    {
        // Create a JSON object from the DTO properties
        var response = new
        {
            Name = dto.Name,
            Email = dto.Email,
            Telephone = dto.Tel,
            Address = dto.Address,
            Description = dto.Description
        };

        // Serialize the response object to JSON
        string jsonResponse = JsonSerializer.Serialize(response);

        // Send the JSON response through the WebSocket connection
        socket.Send(jsonResponse);

        return Task.CompletedTask;
    }
}
