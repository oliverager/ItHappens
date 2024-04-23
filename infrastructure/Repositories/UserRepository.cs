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
        INSERT INTO dinslagter.users (Firstname, Lastname, Email, Phone, UserType_Id) 
        VALUES (@Firstname, @Lastname, @Email, @Phone, @UserType_Id)
        RETURNING
        user_id as {nameof(User.User_Id)},
        firstName as {nameof(User.Firstname)},
        lastName as {nameof(User.Lastname)},
        email as {nameof(User.Email)},
        phone as {nameof(User.Phone)}
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { Firstname, Lastname, Email, Phone, UserType_Id});
        }
    }   
};

