using Dapper;
using infrastructure.DataModels;
using infrastructure.Models.DataModels;
using infrastructure.QueryModels;
using Npgsql;

namespace infrastructure.Repositories;

public class UserRepository
{
    private NpgsqlDataSource _dataSource;

    public UserRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }
    
    // Creating a User

    public User CreateUser(string firstname, string lastname, string username, string email, int phone, int usertype_id)
    {
        string sql = @$"
        INSERT INTO ithappens.users (firstname, lastname, username, email, phone, usertype_id) 
        VALUES (@firstname, @lastname, @username, @email, @phone, @usertype_id)
        RETURNING
        user_id as {nameof(User.user_id)},
        firstname as {nameof(User.firstname)},
        lastname as {nameof(User.lastname)},
        username as {nameof(User.username)},
        email as {nameof(User.email)},
        phone as {nameof(User.phone)},
        usertype_id as {nameof(User.usertype_id)}
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { firstname, lastname, username, email, phone, usertype_id});
        }
    }   
    
    // Delete User
    
    public bool DeleteUser(int userId)
    {
        var sql = @"DELETE FROM ithappens.users WHERE user_id  = @userId;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { userId }) == 1;
        }
    }
    
    // Update User
    
    public User UpdateUser(int user_id, string firstname, string lastname, string username, string email, int phone, int usertype_id)
    {
        string sql = @$"
        UPDATE ithappens.users SET firstname = @firstname, lastname = @lastname, username = @username, email = @email,  phone = @phone, usertype_id = @usertype_id
        WHERE user_id = @user_id 
        RETURNING
        user_id as {nameof(User.user_id)},
        firstname as {nameof(User.firstname)},
        lastname as {nameof(User.lastname)},
        username as {nameof(User.username)},
        email as {nameof(User.email)},
        phone as {nameof(User.phone)},
        usertype_id as {nameof(User.usertype_id)}
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { user_id, firstname, lastname, username, email, phone, usertype_id });
        }
    }
    
    // Get User by ID
    
    public User? GetById(int userId)
    {
        string sql = @$"
        SELECT
        user_id as {nameof(UserFeedQuery.user_id)},
        firstname as {nameof(UserFeedQuery.firstname)},
        lastname as {nameof(UserFeedQuery.lastname)},
        username as {nameof(UserFeedQuery.username)},
        email as {nameof(UserFeedQuery.email)},
        phone as {nameof(UserFeedQuery.phone)},
        usertype_id as {nameof(UserFeedQuery.usertype_id)}
       
        
        FROM ithappens.users
        WHERE user_id = @user_Id 
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { userId });
        } 
    }
    
    public bool DoesUserWithEmailExist(string email)
    {
        var sql = $@"SELECT COUNT(*) FROM ithappens.users WHERE email = @email;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.ExecuteScalar<int>(sql, new { email }) == 1;
        }
    }
};

