﻿using infrastructure.DataModels;
using infrastructure.Models.DataModels;
using infrastructure.QueryModels;
using infrastructure.Repositories;

namespace service.Services;

public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    //get usersfeed
    public IEnumerable<UserFeedQuery> GetUserFeed()
    {
        
        return _userRepository.GetUserFeed();
    }
    
    //Create user
    
    public User CreateUser(string firstname, string lastname, string username, string email, int phone, int usertype_id)
    {
        return _userRepository.CreateUser(firstname, lastname, username, email, phone, usertype_id);
    }
    
    // Update user
    
    public User UpdateUser(int user_id, string firstname, string lastname, string username, string email, int phone, int usertype_id)
    {
        return _userRepository.UpdateUser(user_id, firstname, lastname, username, email, phone, usertype_id);
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