using Dapper;
using infrastructure.Models.DataModels;
using infrastructure.Models.QueryModels;
using Npgsql;

namespace infrastructure.Repositories;

public class AssociationRepository
{
    private NpgsqlDataSource _dataSource;

    public AssociationRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    // get AssociationFeed
    public IEnumerable<AssociationFeedQuery> GetAssociationFeed()
    {
        string sql = $@"
SELECT association_id as {nameof(Association.AssociationId)},
        name as {nameof(Association.Name)},
        email as {nameof(Association.Email)},
        phone as {nameof(Association.Phone)},
        address as {nameof(Association.Address)},
        description as {nameof(Association.Description)},
        bannerurl as {nameof(Association.BannerUrl)},
        profileurl as {nameof(Association.ProfileUrl)}
        FROM ithappens.association
    ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<AssociationFeedQuery>(sql);
        }
    }

    // create an Association
    public Association CreateAssociation(string name, string email, int phone, string address, string description,
        string bannerUrl, string profileUrl)
    {
        string sql = @$"
        INSERT INTO ithappens.association (name, email, phone, address, description, bannerurl, profileurl) 
        VALUES (@name, @email, @phone, @address, @description, @bannerUrl, @profileUrl)
        RETURNING
        association_id as {nameof(Association.AssociationId)},
        name as {nameof(Association.Name)},
        email as {nameof(Association.Email)},
        phone as {nameof(Association.Phone)},
        address as {nameof(Association.Address)},
        description as {nameof(Association.Description)},
        bannerurl as {nameof(Association.BannerUrl)},
        profileurl as {nameof(Association.ProfileUrl)}
        ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Association>(sql,
                new { name, email, phone, address, description, bannerUrl, profileUrl });
        }
    }

    // delete Association
    public bool DeleteAssociation(int associationId)
    {
        var sql = @"DELETE FROM ithappens.association WHERE association_id  = @associationId;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { associationId }) == 1;
        }
    }

    // Update Association
    public Association UpdateAssociation(int association_id, string name, string email, int phone, string address,
        string description, string bannerUrl, string profileUrl)
    {
        string sql = @$"
        UPDATE ithappens.association SET name = @name, email = @email, phone = @phone, address = @address,  description = @description, bannerurl = @bannerUrl, profileurl = @profileUrl 
        WHERE association_id = @association_id 
        RETURNING
        association_id as {nameof(Association.AssociationId)},
        name as {nameof(Association.Name)},
        email as {nameof(Association.Email)},
        phone as {nameof(Association.Phone)},
        address as {nameof(Association.Address)},
        description as {nameof(Association.Description)},
        bannerurl as {nameof(Association.BannerUrl)},
        profileurl as {nameof(Association.ProfileUrl)}
        ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Association>(sql,
                new { association_id, name, email, phone, address, description, bannerUrl, profileUrl });
        }
    }

    // Get Association by id
    public Association? GetById(int associationId)
    {
        string sql = @$"
        SELECT
        association_id as {nameof(AssociationFeedQuery.AssociationId)},
        name as {nameof(AssociationFeedQuery.Name)},
        email as {nameof(AssociationFeedQuery.Email)},
        phone as {nameof(AssociationFeedQuery.Phone)},
        address as {nameof(AssociationFeedQuery.Address)},
        description as {nameof(AssociationFeedQuery.Description)}      
        FROM ithappens.association
        WHERE association_id = @association_Id 
        ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Association>(sql, new { associationId });
        }
    }
}