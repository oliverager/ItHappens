using Dapper;
using Fleck;
using lib;
using Npgsql;

namespace api.ClientWants;

public class ClientWantsToGetEventFeedDto : BaseDto
{
    
}

public class ClientWantsToGetEventFeed() : BaseEventHandler<ClientWantsToGetEventFeedDto>
{
    public override Task Handle(ClientWantsToGetEventFeedDto dto, IWebSocketConnection socket)
    {
        return Task.CompletedTask;
    }
}