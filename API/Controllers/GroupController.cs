using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        readonly IGroupService groupService;

        public GroupController(IGroupService groupService)
        {
            this.groupService = groupService;
        }
        [HttpPost("AddGroup")]
        public void AddGroup([FromQuery] GroupRequestDTO groupRequest)
        {
            groupService.AddGroup(groupRequest);
        }

        [HttpPut("ChangeGroupName")]
        public void ChangeGroupName([FromQuery] int groupId, [FromQuery] string name)
        {
            groupService.ChangeGroupName(groupId, name);
        }

        [HttpDelete("DeleteGroup")]
        public void DeleteGroup([FromQuery] int groupId)
        {
            groupService.DeleteGroup(groupId);
        }

        [HttpPut("AddUserToGroup")]
        public void AddUserTogroup([FromQuery] int userId, [FromQuery] int groupId)
        {
            groupService.AddUserToAGroup(userId, groupId);
        }

        [HttpGet("GetEventGroup")]
        public GroupResponseDTO GetEventGroup([FromQuery] int eventId) 
        { 
            return groupService.GetEventGroup(eventId);
        }

        [HttpGet("GetUserGroups")]
        public IEnumerable<GroupResponseDTO> GetUserGroups([FromQuery] int userId)
        {
            return groupService.GetUserGroups(userId);
        }
    }
}
