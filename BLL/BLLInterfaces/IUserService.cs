using BLL.ResponseDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BLLInterfaces
{
    public interface IUserService
    {
        bool AddFriendship(FriendshipRequestDTO friendshipRequest);
        bool DeleteFriendship(int friendshipId);
        UserResponseDTO GetUser(int userId);
        UserResponseDTO GetUserByEvent(int eventId);
        IEnumerable<UserResponseDTO> GetUsersFriends(int userId);
        IEnumerable<UserResponseDTO> GetAllUsers();
        IEnumerable<UserResponseDTO> GetUsersByName(string name);
        IEnumerable<UserResponseDTO> GetGroupUsers(int groupId);
        IEnumerable<UserResponseDTO> GetEventTaskContributors(int eventTaskId);
        bool ChangeUser(int userId, UserRequestDTO userRequest);
        bool AddUser(UserRequestDTO userRequest);
        IEnumerable<UserResponseDTO> GetUsersNonFriends(int userId);
        IEnumerable<UserResponseDTO> GetUsersNonFriendsByName(int userId, string name);
    }
}
