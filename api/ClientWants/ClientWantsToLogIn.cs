using Fleck;
using infrastructure.DataModels;
using infrastructure.Models.DataModels;
using lib;
using service.Services;
using Newtonsoft.Json; 

namespace api.ClientWants
{
    public class ClientWantsToLogInDto : BaseDto
    {
        public string email { get; set; }
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
            User user = _accountService.Authenticate(dto.email, dto.password);
            
            Console.WriteLine($"User Details: UserId={user.user_id}, Username={user.username}");

            // Assuming you have some authentication logic here
            try
            {
                // Create a JSON object containing the token
                var token = _jwtService.createToken(user);
                var response = new { success = true, token }; // Construct JSON object

                // Serialize the JSON object to a string
                var jsonResponse = JsonConvert.SerializeObject(response);

                // Send the JSON response back to the client
                socket.Send(jsonResponse);
            }
            catch
            {
                // Create a JSON object for failure response
                var response = new { success = false, message = "Login failed" };

                // Serialize the JSON object to a string
                var jsonResponse = JsonConvert.SerializeObject(response);

                // Send the JSON failure response back to the client
                socket.Send(jsonResponse);
            }
            
            return Task.CompletedTask;
        }
    }
}
