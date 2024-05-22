namespace infrastructure.Models.QueryModels;

public class AssociationFeedQuery
{
    public int AssociationId { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public int Phone { get; set; }
    public string? Address { get; set; }
    public string? Description { get; set; }
    public string? BannerUrl { get; set; }
    public string? ProfileUrl { get; set; }
}