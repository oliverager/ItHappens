using System.Text.Json;
using Fleck;
using infrastructure.Models.QueryModels;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToGetAssociationFeedDto : BaseDto;

public class ServerSendsAssociationFeedDto : BaseDto
{
    public IEnumerable<AssociationFeedQuery> AssociationFeedQueries { get; set; }
}

public class ClientWantsToGetAssociationFeed(AssociationService associationService)
    : BaseEventHandler<ClientWantsToGetAssociationFeedDto>
{
    public override async Task Handle(ClientWantsToGetAssociationFeedDto dto, IWebSocketConnection socket)
        => socket.Send(JsonSerializer.Serialize(new ServerSendsAssociationFeedDto()
        {
            AssociationFeedQueries = associationService.GetAssociationFeed()
        }));
}