using System.Diagnostics;
using Dapper;
using infrastructure.DataModels;
using infrastructure.QueryModels;
using Npgsql;

namespace infrastructure.Repositories;

public class ActivityRepository
{
       private NpgsqlDataSource _dataSource;

    public ActivityRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }
    
    // create an Association

    public Activity createActivity(string name, string location, int association_id, DateTime date, int category_id)
    {
        string sql = @$"
        INSERT INTO ithappens.activities (name, location, association_id, date, category_id) 
        VALUES (@name, @location, @association_id, @date, @category_id)
        RETURNING
        activity_id as {nameof(Events.activity_id)},
        name as {nameof(Events.name)},
        location as {nameof(Events.location)},
        association_id as {nameof(Events.association_id)},
        date as {nameof(Events.date)},
        category_id as {nameof(Events.category_id)},
        ";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Activity>(sql, new { name, location, association_id, date, category_id });
        }
    }
    
    // delete Association
    
    public bool deleteActivity(int activityId)
    {
        var sql = @"DELETE FROM ithappens.activities WHERE activity_id  = @activityId;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { activityId }) == 1;
        }
    }
    
    // Update Association

    public Activity updateActivity(int activityn_id, string name, string location, int association_id, DateTime date,
        int category_id)
    {
        string sql = @$"
        UPDATE ithappens.activities SET name = @name, location = @location, association_id = @association_id, date = @date,  category_id = @category_id
        WHERE activity_id = @activity_id 
        RETURNING
        activity_id as {nameof(Events.activity_id)},
        name as {nameof(Events.name)},
        location as {nameof(Events.location)},
        association_id as {nameof(Events.association_id)},
        date as {nameof(Events.date)},
        category_id as {nameof(Events.category_id)}
        ";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Activity>(sql, new { activityn_id, name, location, association_id, date, category_id });
        }
    }
    
    // Get Association by id
    
    public Activity? GetById(int activityId)
    {
        string sql = @$"
        SELECT
        activity_id as {nameof(Events.activity_id)},
        name as {nameof(Events.name)},
        location as {nameof(Events.location)},
        association_id as {nameof(Events.association_id)}
        date as {nameof(Events.date)},
        category_id as {nameof(Events.category_id)},
               
        
        FROM ithappens.activities
        WHERE activity_id = @activity_Id 
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Activity>(sql, new { activityId });
        } 
    }
}