using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using DAL;
using Microsoft.IdentityModel.Tokens;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace BLL_EF
{
 
    public class UserService : IUserService
    {
        internal static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        internal static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
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
                    userResponseDTOs.Add(ToUserResponseDTO(user));

            }

            return userResponseDTOs;
        }

        public UserResponseDTO GetUser(int userId)
        {
            var userResponseDTO = new UserResponseDTO();
            var user = db.Users.FirstOrDefault(u=> u.Id == userId);
            if(user != null)
                userResponseDTO = ToUserResponseDTO(user);
            return userResponseDTO;
        }

        public UserResponseDTO GetUserByEvent(int eventId)
        {
            var userResponseDTO = new UserResponseDTO();
            var ev = db.Events.FirstOrDefault(e => e.Id == eventId);
            if(ev != null)
            {
                var user = db.Users.FirstOrDefault(u => u.Id == ev.UserId);
                if (user != null)
                    userResponseDTO = ToUserResponseDTO(user);
            }         
            return userResponseDTO;
        }

        public IEnumerable<UserResponseDTO> GetGroupUsers(int groupId)
        {
            List<User> users = new List<User>();
            var group = db.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group != null)
            {
                users = db.Users.Where(g=>g.Groups.Contains(group)).ToList();
            }
            return ToUsersResponseDTO(users); 
        }

        public IEnumerable<UserResponseDTO> GetEventTaskContributors(int eventTaskId)
        {
            List<User> users = new List<User>();
            var eventTask = db.EventTasks.FirstOrDefault(e => e.Id == eventTaskId);
            if(eventTask != null)
                users = db.Users.Where(e => e.EventTasks.Contains(eventTask)).ToList();
            return ToUsersResponseDTO(users);
        }

        UserResponseDTO ToUserResponseDTO(User user)
        {
            UserResponseDTO userResponseDTO = new UserResponseDTO
            {
                Id = user.Id,
                Login = user.Login,
                Name = user.Name,
                Image = user.Image,
                CreationDate = user.CreationDate,
                IsAdmin = user.IsAdmin
            };
            return userResponseDTO;
        }

        public bool ChangeUser(int userId, UserRequestDTO userRequest)
        {
            var u = db.Users.Find(userId);
            if (u == null || userRequest == null)
                return false;

            if (userRequest.Password.IsNullOrEmpty() || userRequest.Login.IsNullOrEmpty())
                return false;

            u.Name = userRequest.Name;
            u.Login = userRequest.Login;
            u.Image = userRequest.Image;
            // not possible to change password

            db.SaveChanges();
            return true;
        }

        public bool AddUser(UserRequestDTO userRequest)
        {
            if (userRequest.Login.IsNullOrEmpty() || userRequest.Password.IsNullOrEmpty() || userRequest.Name.IsNullOrEmpty())
                return false;

            User user = new()
            {
                Login = userRequest.Login,
                Name = userRequest.Name,
                Password = GetHashString(userRequest.Password), // HASHOWANIE HASŁA - KAROL !!! // ;)
                IsAdmin = userRequest.IsAdmin,
                Image = userRequest.Image
            };
            db.Users.Add(user);
            db.SaveChanges();
            return true;
        }

        public IEnumerable<UserResponseDTO> GetUsersNonFriends(int userId)
        {
            var friendIds = db.Friendships
                .Where(f => f.UserAId == userId || f.UserBId == userId)
                .Select(f => f.UserAId == userId ? f.UserBId : f.UserAId)
                .ToHashSet();

            var nonFriends = db.Users
                .Where(u => u.Id != userId && !friendIds.Contains(u.Id))
                .ToList();

            var nonFriendsDTOs = nonFriends.Select(u => ToUserResponseDTO(u)).ToList();

            return nonFriendsDTOs;
        }

        public IEnumerable<UserResponseDTO> GetUsersNonFriendsByName(int userId, string name)
        {
            string nameString = name.ToLower();

            var friendIds = db.Friendships
                .Where(f => f.UserAId == userId || f.UserBId == userId)
                .Select(f => f.UserAId == userId ? f.UserBId : f.UserAId)
                .ToHashSet();

            var nonFriends = db.Users
                .Where(u => u.Id != userId && !friendIds.Contains(u.Id) && u.Login.Contains(nameString))
                .ToList();

            var nonFriendsDTOs = nonFriends.Select(u => ToUserResponseDTO(u)).ToList();

            return nonFriendsDTOs;
        }

        IEnumerable<UserResponseDTO> ToUsersResponseDTO(IEnumerable<User> users)
        {
            List<UserResponseDTO> userResponseDTOs = new();
            foreach (var user in users)
            {
                userResponseDTOs.Add(ToUserResponseDTO(user));
            }
            return userResponseDTOs;
        }
  
    }
}
