namespace infrastructure.Models.QueryModels;

public class EventsFeedQuery
{
    public int EventId { get; set; }
    public string? Name { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    public int Price { get; set; }
    public int AssociationId { get; set; }
    public int CategoryId { get; set; }
    public int BookingId { get; set; }
}