using Dapper;
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

    public class Booking
    {
        public int UserId { get; set; }
        public int EventId { get; set; }
    }
    
    
    public void CreateBookingLink(int userId, int eventId)
    {
        string sql = @"
        INSERT INTO ithappens.booking (user_id, event_id)
        VALUES (@UserId, @EventId)
    ";

        using (var conn = _dataSource.OpenConnection())
        {
            conn.Execute(sql, new { UserId = userId, EventId = eventId });
        }
    }

    public void UpdateEventTickets(int eventId, int ticketChange)
    {
        string sql = @"
        UPDATE ithappens.events
        SET amount = amount + @TicketChange
        WHERE event_id = @EventId
    ";

        using (var conn = _dataSource.OpenConnection())
        {
            conn.Execute(sql, new { TicketChange = ticketChange, EventId = eventId });
        }
    }

    public bool DeleteBookingLink(int userId, int eventId)
    {
        string sql = @"
        DELETE FROM ithappens.booking WHERE user_id = @UserId AND event_id = @EventId;
    ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { UserId = userId, EventId = eventId }) == 1;
        }
    }


    public IEnumerable<Booking> GetBookingsForEvent(int eventId)
    {
        string sql = @"
            SELECT user_id, event_id
            FROM ithappens.booking
            WHERE event_id = @EventId;
        ";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<Booking>(sql, new { EventId = eventId });
        }
    }


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
        booking_id as {nameof(Events.BookingId)}
        FROM ithappens.events
    ";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<EventsFeedQuery>(sql);
        }
    }
    
    public bool AssociationExists(int associationId)
    {
        string sql = "SELECT COUNT(1) FROM ithappens.association WHERE association_id = @AssociationId";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.ExecuteScalar<int>(sql, new { AssociationId = associationId }) > 0;
        }
    }


    // create an Event

    public Events CreateEvent(string name, string location, string imageUrl, string description, DateTime date,
        int amount, int price, int associationId, int categoryId, int bookingId)
    {
        if (!AssociationExists(associationId))
        {
            throw new Exception("Association ID does not exist.");
        }
        
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
        booking_id as {nameof(Events.BookingId)}
        ";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Events>(sql,
                new
                {
                    name, location, imageUrl, description, date, amount, price, associationId, categoryId, bookingId
                });
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

    public Events UpdateEvent(int eventId, string name, string location, string imageUrl, string description,
        DateTime date,
        int amount, int price, int associationId, int categoryId, int bookingId)
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
        booking_id as {nameof(Events.BookingId)}
        ";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Events>(sql,
                new
                {
                    eventId, name, location, imageUrl, description, date, amount, price, associationId, categoryId,
                    bookingId
                });
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
        booking_id as {nameof(Events.BookingId)},
               
        FROM ithappens.events
        WHERE event_id  = @EventId; 
        ";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Events>(sql, new { EventId });
        }
    }
}