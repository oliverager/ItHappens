using System.Text.Json;
using Fleck;
using lib;
using service.Services;

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
    private readonly AssociationService _associationService;

    public ClientWantsToCreateAssociations(AssociationService associationService)
    {
        _associationService = associationService;
    }
    public override Task Handle(ClientWantsToCreateAssociationsDto dto, IWebSocketConnection socket)
    {
        try
        {
            _associationService.createAssociation(dto.Name, dto.Email, dto.Tel, dto.Address, dto.Description);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            socket.Send(JsonSerializer.Serialize(new  {eventType= "error", msg = "Failed to add " + dto.Name}));
            throw;
        }

        return Task.CompletedTask;
    }
}
