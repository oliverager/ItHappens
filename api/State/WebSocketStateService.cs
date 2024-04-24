using Fleck;

namespace api.State;

public class WsWithMetadata(IWebSocketConnection connection)
{
    public IWebSocketConnection Connection { get; set; } = connection;
    public string userName { get; set; }
}

public static class WebSocketStateService
{
    public static Dictionary<Guid, WsWithMetadata> Connections = new();

    public static bool AddConnection(IWebSocketConnection ws)
    {
        return Connections.TryAdd(ws.ConnectionInfo.Id, new WsWithMetadata(ws));
        throw new Exception();
    }
}