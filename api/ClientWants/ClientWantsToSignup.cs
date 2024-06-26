﻿using System.Text.Json;
using api.State;
using Fleck;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToSignupDto : BaseDto
{
    public string username { get; set; }
    public string firstname { get; set; }
    public string lastname { get; set; }
    public string password { get; set; }
    public string email { get; set; }
    public int phone { get; set; }
    public int userType_id { get; set;}
    
}

public class ClientWantsToSignup : BaseEventHandler<ClientWantsToSignupDto>
{
    private readonly AccountService _accountService;
    public ClientWantsToSignup(AccountService accountService)
    {
        _accountService = accountService;
        
    }
    public override Task Handle(ClientWantsToSignupDto dto, IWebSocketConnection socket)
    {
        
        if (!WebSocketStateService.Connections.ContainsKey(socket.ConnectionInfo.Id))
        {
            WebSocketStateService.AddConnection(socket);
        }
        
        // Set the username for the socket connection
        WebSocketStateService.Connections[socket.ConnectionInfo.Id].userName = dto.email;

        try
        {
            _accountService.Register(dto.username, dto.firstname, dto.lastname, dto.email, dto.phone, dto.userType_id, dto.password);
            var welcomesmessage = new ServerWelcomesNewUser()
            {
                message = $"Welcome to the platform, " + dto.username, eventType = "success"
            };
            var messageToClient = JsonSerializer.Serialize(welcomesmessage);
            socket.Send(messageToClient);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            var errormessage = new ServerWelcomesNewUser()
            {
                message = $"Failed to add " + dto.username, eventType = "error"
            };
            var messageToClient = JsonSerializer.Serialize(errormessage);
            socket.Send(messageToClient);
        }

        return Task.CompletedTask;
    }
}

public class ServerWelcomesNewUser : BaseDto
{
    public string message { get; set; }
    
}

