using Dapper;
using infrastructure.DataModels;
using infrastructure.Models.QueryModels;
using infrastructure.QueryModels;
using Npgsql;

namespace infrastructure.Repositories;

public class OwnerRepository
{
    
    private NpgsqlDataSource _dataSource;

    public OwnerRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }
    
    
    public Owner? GetOwnerByAsociationId(int ownerId)
    {
        string sql = @$"
        SELECT
        owner_id as {nameof(OwnerFeedQuery.owner_id)},
        user_id as {nameof(OwnerFeedQuery.user_id)},
        association_id as {nameof(OwnerFeedQuery.association_id)}
             
        FROM ithappens.owner
        WHERE association_id = @association_id 
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Owner>(sql, new { ownerId });
        } 
    }
}