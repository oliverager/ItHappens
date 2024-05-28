using Dapper;
using infrastructure.DataModels;
using infrastructure.Models.DataModels;
using infrastructure.QueryModels;
using Microsoft.AspNetCore.Identity;
using Npgsql;

namespace infrastructure.Repositories;

public class UserRepository
{
    private NpgsqlDataSource _dataSource;

    public UserRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }
    
    public IEnumerable<UserFeedQuery> GetUserFeed()
    {
        string sql = $@"
SELECT user_id as {nameof(User.user_id)},
        firstname as {nameof(User.firstname)},
        lastname as {nameof(User.lastname)},
        username as {nameof(User.username)},
        email as {nameof(User.email)},
        phone as {nameof(User.phone)},
        usertype_id as{nameof(User.usertype_id)}
        FROM ithappens.users
    ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<UserFeedQuery>(sql);
        }
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
        var deletePasswordHashSql = @"DELETE FROM ithappens.passwordhash WHERE user_id = @userId;";
        var deleteBookingSql = @"DELETE FROM ithappens.booking WHERE user_id = @userId;";
        var deleteOwnerSql = @"DELETE FROM ithappens.owner WHERE user_id = @userId;";
        var deleteUserSql = @"DELETE FROM ithappens.users WHERE user_id = @userId;";
    
        using (var conn = _dataSource.OpenConnection())
        {
            using (var transaction = conn.BeginTransaction())
            {
                try
                {
                    // Delete related records in passwordhash table
                    conn.Execute(deletePasswordHashSql, new { userId }, transaction);

                    // Delete related records in booking table
                    conn.Execute(deleteBookingSql, new { userId }, transaction);

                    // Delete related records in owner table
                    conn.Execute(deleteOwnerSql, new { userId }, transaction);

                    // Now delete the user record
                    var rowsAffected = conn.Execute(deleteUserSql, new { userId }, transaction);
                
                    transaction.Commit();
                    return rowsAffected == 1;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
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
        WHERE user_id = @userId 
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

