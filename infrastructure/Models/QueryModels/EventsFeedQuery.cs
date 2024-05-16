namespace infrastructure.Models.QueryModels;

public class EventsFeedQuery
{
    public int EventId { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public int Price { get; set; }
    public string ImageUrl { get; set; }
    public DateTime Date { get; set; }
    public int Category_id { get; set; }
}