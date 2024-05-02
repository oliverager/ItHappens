using System.Runtime.InteropServices.JavaScript;

namespace infrastructure.DataModels;

public class Activities
{
    public int activity_id { get; set; }
    public string name { get; set; }
    public string location { get; set; }
    public int association_id { get; set; }
    public DateTime date { get; set; }
    public int category_id { get; set; }
}