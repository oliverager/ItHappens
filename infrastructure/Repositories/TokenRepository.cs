using Dapper;
using infrastructure.DataModels;
using infrastructure.Models.DataModels;
using infrastructure.QueryModels;
using Npgsql;

namespace infrastructure.Repositories;

public class TokenRepository
{
    private readonly NpgsqlDataSource _dataSource;

    public TokenRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    public User userFromUsername(string nameClaimValue)
    {
        try
        {
            string sql = $@"
        SELECT user_id as {nameof(UserFeedQuery.user_id)},
        firstname as {nameof(UserFeedQuery.firstname)},
        lastname as {nameof(UserFeedQuery.lastname)},
        username as {nameof(UserFeedQuery.username)},
        email as {nameof(UserFeedQuery.email)},
        phone {nameof(UserFeedQuery.phone)},
        usertype_id as {nameof(UserFeedQuery.usertype_id)},
        FROM ithappens.users
        WHERE username = @username";  
            
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<User>(sql, new {username = nameClaimValue});
            }
        }
        catch (Exception e)
        {
            throw new Exception("User not found");
        }
        
    }
}