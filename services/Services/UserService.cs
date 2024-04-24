using infrastructure.DataModels;
using infrastructure.Repositories;

namespace services.Services;

public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    //Create user
    
    public User CreateUser(string Firstname, string Lastname, string Email, int Phone, int UserType_Id)
    {
        return _userRepository.CreateUser(Firstname, Lastname, Email, Phone, UserType_Id);
    }
    
    // Update user
    
    public User UpdateUser(int User_Id, string Firstname, string Lastname, string Email, int Phone, int UserType_Id)
    {
        return _userRepository.UpdateUser(User_Id, Firstname, Lastname, Email, Phone, UserType_Id);
    }
    
    // Delete user
    
    public void DeleteUser(int userId)
    {
        var result = _userRepository.DeleteUser(userId);
        if (!result)
        {
            throw new Exception("Unable to delete the user");
        }
    }
}