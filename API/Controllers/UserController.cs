using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("AddFriendship")]
        public void AddFriendship([FromQuery]FriendshipRequestDTO friendshipRequestDTO)
        {
            userService.AddFriendship(friendshipRequestDTO);
        }

        [HttpDelete("DeleteFriendship")]
        public void DeleteFriendShip([FromQuery] int friendshipId)
        {
            userService.DeleteFriendship(friendshipId);
        }

        [HttpGet("GetUserFriends")]
        public IEnumerable<UserResponseDTO> GetUserFriends([FromQuery] int userId) 
        {
            return userService.GetUsersFriends(userId);
        }

        [HttpGet("GetAllUsers")]
        public IEnumerable<UserResponseDTO> GetAllUsers()
        {
            return userService.GetAllUsers();
        }

        [HttpGet("GetUserByName")]
        public IEnumerable<UserResponseDTO> GetUsersByName([FromQuery] string name)
        {
            return userService.GetUsersByName(name);
        }
    }
}
