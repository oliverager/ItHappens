using infrastructure.Repositories;
using infrastructure.DataModels;

namespace service.Services;

public class AssociationService
{
    private readonly AssociationRepository _associationRepository;

    public AssociationService(AssociationRepository associationRepository)
    {
        _associationRepository = associationRepository;
    }
    
    //Create Association
    
    public Association CreateAssociation(string name, string email, int phone, string address, string description, string bannerUrl, string profileUrl)
    {
        return _associationRepository.CreateAssociation(name, email, phone, address, description, bannerUrl, profileUrl);
    }
    
    // Update Association
    
    public Association UpdateAssociation(int association_id, string name, string email, int phone, string address, string description, string bannerUrl, string profileUrl)
    {
        return _associationRepository.UpdateAssociation(association_id, name, email, phone, address, description, bannerUrl, profileUrl);
    }
    
    // Delete Association
    
    public void DeleteAssociation(int associationId)
    {
        var result = _associationRepository.DeleteAssociation(associationId);
        if (!result)
        {
            throw new Exception("Unable to delete the user");
        }
    }
}