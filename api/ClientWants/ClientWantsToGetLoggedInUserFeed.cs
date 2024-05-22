using System.Text.Json;
using Fleck;
using infrastructure.QueryModels;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToGetLoggedInUserFeedDto : BaseDto;

public class ServerSendsLoggedInUserFeedDto : BaseDto
{
    public IEnumerable<UserFeedQuery> UserFeedQueries { get; set; }
}

public class ClientWantsToGetLoggedInUserFeed(UserService userService)
    : BaseEventHandler<ClientWantsToGetLoggedInUserFeedDto>
{
    public override async Task Handle(ClientWantsToGetLoggedInUserFeedDto dto, IWebSocketConnection socket)
        => socket.Send(JsonSerializer.Serialize(new ServerSendsLoggedInUserFeedDto()
            {
                //UserFeedQueries = userService.GetById()
            }
        ));
}