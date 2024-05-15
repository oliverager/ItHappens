namespace service.Services;

public class ActivityService
{
    private readonly ActivityRepository _activityRepository;

    public ActivityService(ActivityRepository _activityRepository)
    {
    _activityRepository = _activityRepository
    }

    public Activity createActivity(string activityImage, string category, number location, string address, string association, Date booking)
    {
    return _associationRepository.createActivity(activityImage,category,location,address,association,booking)
    }

    public Activity updateActivity(int activity_id, string activityImage, string category, number location, string address, string association, Date booking)
    {
    return _activityRepository.updateActivity(activity_id,activityImage,category,location,address,association,booking);
    }
    public void deleteActivity(int activity_id)
    {
        var result = _activityRepository.deleteActivity(activity_id);
        if (!result)
        {
        throw new Exception("Unable to delete the activity");
        }
    }
}