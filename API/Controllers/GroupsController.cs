using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        readonly IGroupService groupService;

        public GroupsController(IGroupService groupService)
        {
            this.groupService = groupService;
        }
        [HttpPost]
        public void AddGroup([FromBody] GroupRequestDTO groupRequest)
        {
            groupService.AddGroup(groupRequest);
        }

        [HttpPut("ChangeName/{id}")]
        public void ChangeGroupName(int id, [FromBody] string name)
        {
            groupService.ChangeGroupName(id, name);
        }

        [HttpDelete("{id}")]
        public void DeleteGroup(int id)
        {
            groupService.DeleteGroup(id);
        }

        [HttpPost("{userId}/{groupId}")]
        public void AddUserTogroup(int userId, int groupId)
        {
            groupService.AddUserToAGroup(userId, groupId);
        }

        [HttpGet("event/{eventId}")]
        public GroupResponseDTO GetEventGroup(int eventId) 
        { 
            return groupService.GetEventGroup(eventId);
        }

        [HttpGet("user/{userId}")]
        public IEnumerable<GroupResponseDTO> GetUserGroups(int userId)
        {
            return groupService.GetUserGroups(userId);
        }
    }
}
