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
    
    public Association createAssociation(string name, string email, int phone, string address, string description)
    {
        return _associationRepository.createAssociation(name, email, phone, address, description);
    }
    
    // Update Association
    
    public Association updateAssociation(int association_id, string name, string email, int phone, string address, string description)
    {
        return _associationRepository.updateAssociation(association_id, name, email, phone, address, description);
    }
    
    // Delete Association
    
    public void deleteAssociation(int associationId)
    {
        var result = _associationRepository.deleteAssociation(associationId);
        if (!result)
        {
            throw new Exception("Unable to delete the user");
        }
    }
}