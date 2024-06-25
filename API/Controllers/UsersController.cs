using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
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

        [HttpGet, AllowAnonymous]
        public IEnumerable<UserResponseDTO> GetAllUsers()
        {
            return userService.GetAllUsers();
        }

        [HttpGet("UserByName")]
        public IEnumerable<UserResponseDTO> GetUsersByName([FromQuery] string name)
        {
            return userService.GetUsersByName(name);
        }

        [HttpGet("{id}"), AllowAnonymous    ]
        public UserResponseDTO GetUser(int id)
        {
            return userService.GetUser(id);
        }

        [HttpGet("event/{id}")]
        public UserResponseDTO GetUserByEvent(int id)
        {
            return userService.GetUserByEvent(id);
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

        [HttpPut("{id}")]
        public void ChangeUser([FromBody] UserRequestDTO userRequest, int id)
        {
            userService.ChangeUser(id, userRequest);
        }

        [HttpPost, AllowAnonymous]
        public void AddUser([FromBody] UserRequestDTO userRequest)
        {
            userService.AddUser(userRequest);
        }

        [HttpGet("{id}/NonFriends")]
        public IEnumerable<UserResponseDTO> GetUsersNonFriends(int id)
        {
            return userService.GetUsersNonFriends(id);
        }

        [HttpGet("{id}/NonFriends/Name")]
        public IEnumerable<UserResponseDTO> GetUsersNonFriendsByName(int id, [FromQuery] string name)
        {
            return userService.GetUsersNonFriendsByName(id, name); 
        }
    }
}
