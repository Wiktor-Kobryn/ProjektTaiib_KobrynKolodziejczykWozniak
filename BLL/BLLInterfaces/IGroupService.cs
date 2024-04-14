using BLL.ResponseDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BLLInterfaces
{
    public interface IGroupService
    {
        bool AddGroup(GroupRequestDTO groupRequest);
        bool ChangeGroupName(int groupId, string name);
        bool DeleteGroup(int groupId);
        GroupResponseDTO GetEventGroup(int eventId);
        IEnumerable<GroupResponseDTO> GetUserGroups(int userId);
        bool AddUserToAGroup(int userId, int groupId);
    }
}
