using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("Friendship")]
        public void AddFriendship([FromBody]FriendshipRequestDTO friendshipRequestDTO)
        {
            userService.AddFriendship(friendshipRequestDTO);
        }

        [HttpDelete("Friendship/{id}")]
        public void DeleteFriendShip(int id)
        {
            userService.DeleteFriendship(id);
        }

        [HttpGet("UserFriends/{userId}")]
        public IEnumerable<UserResponseDTO> GetUserFriends(int userId) 
        {
            return userService.GetUsersFriends(userId);
        }

        [HttpGet]
        public IEnumerable<UserResponseDTO> GetAllUsers()
        {
            return userService.GetAllUsers();
        }

        [HttpGet("UserByName")]
        public IEnumerable<UserResponseDTO> GetUsersByName([FromQuery] string name)
        {
            return userService.GetUsersByName(name);
        }

        [HttpGet("{id}")]
        public UserResponseDTO GetUser(int id)
        {
            return userService.GetUser(id);
        }

        [HttpGet("event/{id}")]
        public UserResponseDTO GetUserByEvent(int id)
        {
            return userService.GetUser(id);
        }

        [HttpGet("group/{groupId}")]
        public IEnumerable<UserResponseDTO> GetGroupUsers(int groupId)
        {
            return userService.GetGroupUsers(groupId);
        }

        [HttpGet("eventTask/{eventTaskId}")]
        public IEnumerable<UserResponseDTO> GetEventTaskContributors(int eventTaskId)
        {
            return userService.GetEventTaskContributors(eventTaskId);
        }
    }
}
