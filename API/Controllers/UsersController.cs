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
    }
}
