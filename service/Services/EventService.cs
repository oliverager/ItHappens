using infrastructure.Models.DataModels;
using infrastructure.Models.QueryModels;
using infrastructure.Repositories;

namespace service.Services;

public class EventService
{
    private readonly EventRepository _eventRepository;

    public EventService(EventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }

    public IEnumerable<EventsFeedQuery> GetEventFeed()
    {
        return _eventRepository.GetEventsFeed();
    }

    public Events CreateEvent(string name, string location, string imageUrl, string description, DateTime date,
        int amount, int price, int associationId, int categoryId, int bookingId)
    {
        return _eventRepository.CreateEvent(name, location, imageUrl, description, date, amount, price, associationId,
            categoryId, bookingId);
    }

    public Events UpdateEvents(int eventId, string name, string location, string imageUrl, string description,
        DateTime date,
        int amount, int price, int associationId, int categoryId, int bookingId)
    {
        return _eventRepository.UpdateEvent(eventId, name, location, imageUrl, description, date, amount, price,
            associationId, categoryId, bookingId);
    }

    public void DeleteEvent(int eventId)
    {
        var result = _eventRepository.DeleteEvent(eventId);
        if (!result)
        {
            throw new Exception("Could not Delete Event");
        }
    }
}