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
    public class UserService : IUserService
    {
        private readonly CheckChartContext db;

        public UserService(CheckChartContext db)
        {
            this.db = db;
        }

        public bool AddFriendship(FriendshipRequestDTO friendshipRequest)
        {
            var userA = db.Users.Find(friendshipRequest.UserAId);
            if (userA == null)
                return false;

            var userB = db.Users.Find(friendshipRequest.UserBId);
            if (userB == null)
                return false;

            Friendship friendship = new()
            {
                UserAId = friendshipRequest.UserAId,
                UserBId = friendshipRequest.UserBId
            };

            db.Friendships.Add(friendship);
            db.SaveChanges();
            return true;
        }

        public bool DeleteFriendship(int friendshipId)
        {
            var f = db.Friendships.Find(friendshipId);
            if (f == null) 
                return false;

            db.Friendships.Remove(f);
            db.SaveChanges();
            return true;
        }

        public IEnumerable<UserResponseDTO> GetAllUsers()
        {
            var users = db.Users.ToList();
            return ToUsersResponseDTO(users);
        }

        public IEnumerable<UserResponseDTO> GetUsersByName(string name)
        {
            var users = db.Users.Where(u => u.Name.ToLower().Contains(name));
            return ToUsersResponseDTO(users);
        }

        public IEnumerable<UserResponseDTO> GetUsersFriends(int userId)
        {
            var friendships = db.Friendships.Where(u => u.UserAId == userId || u.UserBId == userId).ToList(); 

            List<UserResponseDTO> userResponseDTOs = new List<UserResponseDTO>();

            foreach (var f in friendships)
            {
                int friendId = (int)(f.UserAId == userId ? f.UserBId : f.UserAId);

                var user = db.Users.FirstOrDefault(u => u.Id == friendId);
                if (user != null)
                {
                    var e = new UserResponseDTO
                    {
                        Id = user.Id,
                        Login = user.Login,
                        Name = user.Name,
                        Image = user.Image,
                        CreationDate = user.CreationDate,
                        IsAdmin = user.IsAdmin
                    };
                    userResponseDTOs.Add(e);
                }
            }

            return userResponseDTOs;
        }

        IEnumerable<UserResponseDTO> ToUsersResponseDTO(IEnumerable<User> users)
        {
            List<UserResponseDTO> userResponseDTOs = new();
            foreach (var user in users)
            {
                var e = new UserResponseDTO
                {
                    Id = user.Id,
                    Login = user.Login,
                    Name = user.Name,
                    Image = user.Image,
                    CreationDate = user.CreationDate,
                    IsAdmin = user.IsAdmin
                };
                userResponseDTOs.Add(e);
            }
            return userResponseDTOs;
        }
    }
}
