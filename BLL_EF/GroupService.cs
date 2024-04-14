using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class GroupService : IGroupService
    {
        private readonly CheckChartContext db;

        public GroupService(CheckChartContext db)
        {
            this.db = db;
        }

        public bool AddGroup(GroupRequestDTO groupRequest)
        {
            var e = db.Events.Find(groupRequest.EventId);
            if (e == null)
                return false;

            Group group = new()
            {
                Name = groupRequest.Name,
                EventId = groupRequest.EventId
            };
            
            db.Groups.Add(group);
            db.SaveChanges();
            e.GroupId = group.Id;
            db.SaveChanges();
            return true;
        }

        public bool AddUserToAGroup(int userId, int groupId)
        {
            var user = db.Users.Find(userId);
            if (user == null) 
                return false;

            var group = db.Groups.Find(groupId);
            if(group == null)
                return false;

            //dodawanie

            db.SaveChanges();
            return true;
        }

        public bool ChangeGroupName(int groupId, string name)
        {
            var group = db.Groups.Find(groupId);
            if (group == null)
                return false;

            if (name == null)
                return false;

            group.Name = name;
            db.SaveChanges();
            return true;
        }

        public bool DeleteGroup(int groupId)
        {
            var group = db.Groups.Find(groupId);
            if (group == null)
                return false;

            db.Groups.Remove(group);
            db.SaveChanges();
            return true;
        }

        public GroupResponseDTO GetEventGroup(int eventId)
        {
            var e = db.Events.Find(eventId);
            if (e == null)
                throw new Exception("Brak eventu");

            Group g = db.Groups.Where(g => g.EventId == eventId).First();
            return ToGroupResponseDTO(g);
        }

        public IEnumerable<GroupResponseDTO> GetUserGroups(int userId)
        {
            var user = db.Users.Find(userId);
            if (user == null)
                throw new Exception("Brak uzytkownika");
            //zle do zrobienia
            var g = db.Groups.Where(u=>u.Users.Contains(user));
            return ToGroupsResponseDTO(g);
        }

        GroupResponseDTO ToGroupResponseDTO(Group group)
        {
            GroupResponseDTO GroupResponseDTO = new()
            {
                EventId= (int)group.EventId,
                Id = group.Id,
                Name = group.Name
            };
            return GroupResponseDTO;
        }

        IEnumerable<GroupResponseDTO> ToGroupsResponseDTO(IEnumerable<Group> groups)
        {
            List<GroupResponseDTO> result = new();
            foreach (var g in groups)
            {
                var e = new GroupResponseDTO
                {
                    EventId = (int)g.EventId,
                    Id = g.Id,
                    Name = g.Name
                };
                result.Add(e);
            }
            return result;
        }

    }
}
