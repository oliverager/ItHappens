namespace infrastructure.DataModels;

public class User
{
    public int User_Id { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Email { get; set; }
    public int Phone { get; set; }
    public int userTypeId { get; set; }

}