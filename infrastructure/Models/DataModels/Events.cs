using System.Runtime.InteropServices.JavaScript;

namespace infrastructure.DataModels;

public class Events
{
    public int event_id { get; set; }
    public string name { get; set; }
    public string location { get; set; }
    public int association_id { get; set; }
    public DateTime date { get; set; }
    public int category_id { get; set; }
    public string imageurl { get; set; }
    public int amount { get; set; }
    public string description { get; set; }
    public int price { get; set; }
    public int booking_id { get; set; }
}