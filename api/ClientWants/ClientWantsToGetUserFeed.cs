using System.Text.Json;
using Fleck;
using infrastructure.QueryModels;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToGetUserFeedDto : BaseDto;

public class ServerSendsUserFeedDto : BaseDto
{
    public IEnumerable<UserFeedQuery> UserFeedQueries { get; set; }
}

public class ClientWantsToGetUserFeed(UserService userService)
    : BaseEventHandler<ClientWantsToGetUserFeedDto>
{
    public override async Task Handle(ClientWantsToGetUserFeedDto dto, IWebSocketConnection socket)
        => socket.Send(JsonSerializer.Serialize(new ServerSendsUserFeedDto()
            {
                UserFeedQueries = userService.GetEventFeed()
            }
        ));
}