using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ResponseDTO
{
    public class UserResponseDTO
    {
        public int Id { get; init; }
        public string Login { get; init; }
        public string Name { get; init; }
        public string Image { get; init; }
        public bool IsAdmin { get; init; }
        public DateTime CreationDate { get; set; }
    }
}
