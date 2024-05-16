namespace infrastructure.QueryModels;

public class UserFeedQuery
{
    public int user_id { get; set; }
    public string firstname { get; set; }
    public string lastname { get; set; }
    public string username { get; set; }
    public string email { get; set; }
    public int phone { get; set; }
    public int usertype_id { get; set; }
}