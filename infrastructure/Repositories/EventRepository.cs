using System.Diagnostics;
using Dapper;
using infrastructure.DataModels;
using infrastructure.Models.DataModels;
using infrastructure.Models.QueryModels;
using Npgsql;

namespace infrastructure.Repositories;

public class EventRepository
{
       private NpgsqlDataSource _dataSource;

    public EventRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }
    
    // get EventFeed

    public IEnumerable<EventsFeedQuery> GetEventsFeed()
    {
        string sql = $@"
SELECT event_id as {nameof(Events.EventId)},
        name as {nameof(Events.Name)},
        location as {nameof(Events.Location)},
        imageurl as {nameof(Events.ImageUrl)},
        description as {nameof(Events.Description)},
        date as {nameof(Events.Date)},
        amount as {nameof(Events.Amount)},
        price as {nameof(Events.Price)},
        association_id as {nameof(Events.AssociationId)},
        category_id as {nameof(Events.CategoryId)},
        booking_id sa {nameof(Events.BookingId)}
        FROM ithappens.events
    ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<EventsFeedQuery>(sql);
        }
    }
    
    
    
    // create an Event

    public Events CreateEvent(string name, string location, string imageUrl, string description, DateTime date,
        int amount, int price, int associationId,int categoryId, int bookingId)
    {
        string sql = @$"
        INSERT INTO ithappens.events (name, location, imageurl, description, date, amount, price, association_id, category_id, booking_id) 
        VALUES (@name, @location, @imageUrl, @description, @date, @amount, @price, @associationId, @categoryId, @bookingId)
        RETURNING
        event_id as {nameof(Events.EventId)},
        name as {nameof(Events.Name)},
        location as {nameof(Events.Location)},
        imageurl as {nameof(Events.ImageUrl)},
        description as {nameof(Events.Description)},
        date as {nameof(Events.Date)},
        amount as {nameof(Events.Amount)},
        price as {nameof(Events.Price)},
        association_id as {nameof(Events.AssociationId)},
        category_id as {nameof(Events.CategoryId)},
        booking_id sa {nameof(Events.BookingId)}
        ";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Events>(sql, new { name, location, imageUrl, description, date, amount, price, associationId, categoryId, bookingId });
        }
    }
    
    // delete Event
    
    public bool DeleteEvent(int EventId)
    {
        var sql = @"DELETE FROM ithappens.events WHERE event_id  = @EventId;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { EventId }) == 1;
        }
    }
    
    // Update Event

    public Events UpdateEvent(int eventId, string name, string location, string imageUrl, string description, DateTime date,
        int amount, int price, int associationId,int categoryId, int bookingId)
    {
        string sql = @$"
        UPDATE ithappens.events SET name = @name, location = @location, imageurl = @imageUrl, description = @description, date = @date, amount = @amount, price = @price, association_id = @associationId, category_id = @categoryId, booking_id = @bookingId
        WHERE event_id = @eventId 
        RETURNING
        event_id as {nameof(Events.EventId)},
        name as {nameof(Events.Name)},
        location as {nameof(Events.Location)},
        imageurl as {nameof(Events.ImageUrl)},
        description as {nameof(Events.Description)},
        date as {nameof(Events.Date)},
        amount as {nameof(Events.Amount)},
        price as {nameof(Events.Price)},
        association_id as {nameof(Events.AssociationId)},
        category_id as {nameof(Events.CategoryId)},
        booking_id sa {nameof(Events.BookingId)}
        ";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Events>(sql, new { eventId, name, location, imageUrl, description, date, amount, price, associationId, categoryId, bookingId });
        }
    }
    
    // Get Events by id
    
    public Events GetById(int EventId)
    {
        string sql = @$"
        SELECT
        event_id as {nameof(Events.EventId)},
        name as {nameof(Events.Name)},
        location as {nameof(Events.Location)},
        imageurl as {nameof(Events.ImageUrl)},
        description as {nameof(Events.Description)},
        date as {nameof(Events.Date)},
        amount as {nameof(Events.Amount)},
        price as {nameof(Events.Price)},
        association_id as {nameof(Events.AssociationId)},
        category_id as {nameof(Events.CategoryId)},
        booking_id sa {nameof(Events.BookingId)},
               
        FROM ithappens.events
        WHERE event_id  = @EventId; 
        ";
            
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Events>(sql, new { EventId });
        } 
    }
}