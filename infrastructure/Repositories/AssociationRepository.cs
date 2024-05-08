﻿using Dapper;
using infrastructure.DataModels;
using infrastructure.QueryModels;
using Npgsql;

namespace infrastructure.Repositories;

public class AssociationRepository
{
    private NpgsqlDataSource _dataSource;

    public AssociationRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }
    
    // create an Association

    public Association createAssociation(string name, string email, int phone, string address, string description)
    {
        string sql = @$"
        INSERT INTO ithappens.association (name, email, phone, address, description) 
        VALUES (@name, @email, @phone, @address, @description)
        RETURNING
        association_id as {nameof(Association.association_id)},
        name as {nameof(Association.name)},
        email as {nameof(Association.email)},
        phone as {nameof(Association.phone)},
        address as {nameof(Association.address)},
        description as {nameof(Association.description)},
        ";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Association>(sql, new { name, email, phone, address, description});
        }
    }
    
    // delete Association
    
    public bool deleteAssociation(int associationId)
    {
        var sql = @"DELETE FROM ithappens.association WHERE association_id  = @associationId;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { associationId }) == 1;
        }
    }
    
    // Update Association

    public Association updateAssociation(int association_id, string name, string email, int phone, string address,
        string description)
    {
        string sql = @$"
        UPDATE ithappens.association SET name = @name, email = @email, phone = @phone, address = @address,  description = @description
        WHERE association_id = @association_id 
        RETURNING
        association_id as {nameof(Association.association_id)},
        name as {nameof(Association.name)},
        email as {nameof(Association.email)},
        phone as {nameof(Association.phone)},
        address as {nameof(Association.address)},
        description as {nameof(Association.description)}
        ";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Association>(sql, new { association_id, name, email, phone, address, description });
        }
    }
    
    // Get Association by id
    
    public Association? GetById(int associationId)
    {
        string sql = @$"
        SELECT
        association_id as {nameof(AssociationFeedQuery.association_id)},
        name as {nameof(AssociationFeedQuery.name)},
        email as {nameof(AssociationFeedQuery.email)},
        phone as {nameof(AssociationFeedQuery.phone)}
        address as {nameof(AssociationFeedQuery.address)},
        description as {nameof(AssociationFeedQuery.description)},
               
        
        FROM ithappens.association
        WHERE association_id = @association_Id 
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Association>(sql, new { associationId });
        } 
    }
}