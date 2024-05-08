using System.Security.Authentication;
using infrastructure.DataModels;
using infrastructure.Repositories;
using Microsoft.Extensions.Logging;
using service.Password;

namespace service.Services;

public class AccountService
{
    private readonly ILogger<AccountService> _logger;
    private readonly PasswordHashRepository _passwordHashRepository;
    private readonly UserRepository _userRepository;

    public AccountService(ILogger<AccountService> logger, UserRepository userRepository,
        PasswordHashRepository passwordHashRepository)
    {
        _logger = logger;
        _userRepository = userRepository;
        _passwordHashRepository = passwordHashRepository;
    }
    
    // Authenticate User.

    public User? Authenticate(string email, string password)
    {
        try
        {
            _logger.LogInformation("Attempting to authenticate user with email: {Email}", email);
        
            var passwordHash = _passwordHashRepository.GetByEmail(email);
            _logger.LogInformation("Retrieved password hash for user with email: {Email}", email);
        
            var hashAlgorithm = PasswordHashAlgorithm.Create(passwordHash.algorithm);
            _logger.LogInformation("Created hash algorithm instance for user with email: {Email}", email);
        
            var isValid = hashAlgorithm.VerifyHashedPassword(password, passwordHash.hash, passwordHash.salt);
            _logger.LogInformation("Verification result for user with email {Email}: {IsValid}", email, isValid);
        
            if (isValid)
            {
                var user = _userRepository.GetById(passwordHash.user_id);
                _logger.LogInformation("User with email {Email} authenticated successfully", email);
                return user;
            }
        }
        catch (Exception e)
        {
            _logger.LogError("Authenticate error: {Message}", e);
        }

        _logger.LogWarning("Authentication failed for user with email: {Email}", email);
        throw new InvalidCredentialException("Invalid credential!");
    }


    public User Register(string username, string firstname, string lastname, string email, int phone, int usertype_id, string password)
    {
        try
        {
            // Check if the email is unique
         //   if (!_userRepository.DoesUserWithEmailExist(email))
            {
                // Email is unique, proceed with registration
                var hashAlgorithm = PasswordHashAlgorithm.Create();
                var salt = hashAlgorithm.GenerateSalt();
                var passwordHash = hashAlgorithm.HashPassword(password, salt);
                var user = _userRepository.CreateUser(firstname,lastname, username, email, phone, usertype_id);
                _passwordHashRepository.CreateUser(user.user_id, passwordHash, salt, hashAlgorithm.GetName());
                return user;
            }
            //else
            {
                // Email is not unique, handle accordingly (throw an exception, log, etc.)
                throw new ArgumentException("Email address is already registered.");
            }
        }
        catch (Exception e)
        {
            _logger.LogError("Registration error: {Message}", e);
            throw; // Rethrow the exception to handle it at the controller level
        }
    }
    
 //   public bool IsEmailInUse(string email)
 //   {
   //     return _userRepository.DoesUserWithEmailExist(email);
    //}
    

}