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
        IEnumerable<UserResponseDTO> GetUsersFriends(int userId);
        IEnumerable<UserResponseDTO> GetAllUsers();
        IEnumerable<UserResponseDTO> GetUsersByName();
    }
}
