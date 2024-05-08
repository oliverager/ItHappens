using Fleck;
using lib;
using service.Services;

namespace api.ClientWants;

public class ClientWantsToLogInDto : BaseDto
{
    public string username { get; set; }
    public string password { get; set; }
    
   
}

public class ClientWantsToLogIn : BaseEventHandler<ClientWantsToLogInDto>
{
   
    private readonly AccountService _accountService;
    private readonly JwtService _jwtService;

    public ClientWantsToLogIn(AccountService accountService, JwtService jwtService)
    {
        _accountService = accountService;
        _jwtService = jwtService;
    }

    public override Task Handle(ClientWantsToLogInDto dto, IWebSocketConnection socket)
    {
       
        // Assuming you have some authentication logic here
        if (IsUserAuthenticated(dto))
        {
            // Send a success message back to the client
            var user = _accountService.Authenticate(dto.username, dto.password);
            var token = _jwtService.createToken(user);

            socket.Send($"Login Successfull");
            
        }
        else
        {
            // Send a failure message back to the client
            socket.Send("Login failed");
        }

        return Task.CompletedTask;
    }

    private bool IsUserAuthenticated(ClientWantsToLogInDto dto)
    {
        // Implement your authentication logic here
        // For example, check the username and password against a database
        // Return true if authentication is successful, false otherwise
        return dto.username == "example_user" && dto.password == "example_password";
    }
}