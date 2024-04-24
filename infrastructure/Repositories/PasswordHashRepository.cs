﻿using System.Security.Cryptography;
using Dapper;
using infrastructure.DataModels;
using Npgsql;

namespace infrastructure.Repositories;


public class PasswordHashRepository
{
    
    private NpgsqlDataSource _dataSource;

    public PasswordHashRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    
    
    //Create
    
    public void CreateUser(int user_id, string password_hash, string salt, string algorithm)
    {
        const string sql = $@"
    INSERT INTO ithappens.passwordhash (user_id, password_hash, salt, algorithm)
    VALUES (@user_id, @password_hash, @salt, @algorithm)
    ";
        // Log or print the SQL query (for debugging purposes)
        Console.WriteLine($"Executing SQL Query: {sql}");
        
        using (var conn = _dataSource.OpenConnection())
        { 
            conn.Execute(sql, new { user_id, password_hash, salt, algorithm });
        }
        
    }

    
    
    //Retrieve by email
    public PasswordHash GetByEmail(string email)
    {
        const string sql = $@"
    SELECT
        passwordhash.user_id as {nameof(PasswordHash.user_id)},
        password_hash as {nameof(PasswordHash.hash)},
        salt as {nameof(PasswordHash.salt)},
        algorithm as {nameof(PasswordHash.algorithm)}
    FROM ithappens.passwordhash
    JOIN ithappens.users ON ithappens.passwordhash.user_id = ithappens.users.user_id
    WHERE ithappens.users.email = @email;
    
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<PasswordHash>(sql, new { email });
        }
    }
    
    
    
    //Update
    
    public void Update(int user_id, string hash, string salt, string algorithm)
    {
        const string sql = $@"
UPDATE passwordhash
SET hash = @hash, salt = @salt, algorithm = @algorithm
WHERE user_id = @user_Id
";
        using (var conn = _dataSource.OpenConnection())
        { 
            conn.Execute(sql, new { user_id, hash, salt, algorithm });
        }
    }


}