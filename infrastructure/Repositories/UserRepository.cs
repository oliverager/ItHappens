using Dapper;
using infrastructure.DataModels;
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

    public User CreateUser(string Firstname, string Lastname, string Email, int Phone, int UserType_Id)
    {
        string sql = @$"
        INSERT INTO ithappens.users (Firstname, Lastname, Email, Phone, UserType_Id) 
        VALUES (@Firstname, @Lastname, @Email, @Phone, @UserType_Id)
        RETURNING
        user_id as {nameof(User.User_Id)},
        Firstname as {nameof(User.Firstname)},
        Lastname as {nameof(User.Lastname)},
        Email as {nameof(User.Email)},
        Phone as {nameof(User.Phone)}
        UserType_Id as {nameof(User.UserType_Id)}
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { Firstname, Lastname, Email, Phone, UserType_Id});
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
    
    public User UpdateUser(int User_Id, string Firstname, string Lastname, string Email, int Phone, int UserType_Id)
    {
        string sql = @$"
        UPDATE ithappens.users SET Firstname = @Firstname, Lastname = @lastName, Email = @email,  phone = @phone, UserType_Id = @usertype_Id
        WHERE user_id = @user_Id 
        RETURNING
        User_Id as {nameof(User.User_Id)},
        Firstname as {nameof(User.Firstname)},
        Lastname as {nameof(User.Lastname)},
        Email as {nameof(User.Email)},
        Phone as {nameof(User.Phone)},
        UserType_Id as {nameof(User.UserType_Id)}
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { User_Id, Firstname, Lastname, Email, Phone, UserType_Id });
        }
    }
};

