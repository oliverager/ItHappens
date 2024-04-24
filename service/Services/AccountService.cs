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
            var passwordHash = _passwordHashRepository.GetByEmail(email);
            var hashAlgorithm = PasswordHashAlgorithm.Create(passwordHash.algorithm);
            var isValid = hashAlgorithm.VerifyHashedPassword(password, passwordHash.hash, passwordHash.salt);
            if (isValid) return _userRepository.GetById(passwordHash.user_id);
        }
        catch (Exception e)
        {
            _logger.LogError("Authenticate error: {Message}", e);
        }

        throw new InvalidCredentialException("Invalid credential!");
    }

    public User Register(string firstname, string lastname, string email, int phone, int usertype_id, string password)
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
                var user = _userRepository.CreateUser(firstname, lastname, email, phone, usertype_id);
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