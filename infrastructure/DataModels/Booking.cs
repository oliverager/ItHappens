namespace infrastructure.DataModels;

public class Booking
{
    public int booking_id { get; set; }
    public int user_id { get; set; }
    public DateTime date { get; set; }
}