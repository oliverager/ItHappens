using Fleck;
using lib;

namespace api.ClientWants;

public class ClientWantsToCreateAssociationsDto : BaseDto
{
    
}

public class ClientWantsToCreateAssociations : BaseEventHandler<ClientWantsToCreateAssociationsDto>
{
    public override Task Handle(ClientWantsToCreateAssociationsDto dto, IWebSocketConnection socket)
    {
        throw new NotImplementedException();
    }
}