using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace BLL.ResponseDTO
{
    public class UserRequestDTO
    {
   

        public string Login { get; init; }
        public string Password { get; init; }
        public string Name { get; init; }
        public string Image { get; init; }
        public bool IsAdmin { get; init; }
    }
}
