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
    
    public void CreateOwnerLink(int userId, int associationId)
    {
        string sql = @"
                INSERT INTO ithappens.owner (user_id, association_id)
                VALUES (@UserId, @AssociationId)
            ";

        using (var conn = _dataSource.OpenConnection())
        {
            conn.Execute(sql, new { UserId = userId, AssociationId = associationId });
        }
    }
    
    public int? GetAssociationIdByUserId(int userId)
    {
            string sql = @$"
             SELECT
             association_id
             FROM ithappens.owner
             WHERE user_id = @userId
             ";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<int?>(sql, new { userId });
        }
    }

}