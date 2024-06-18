using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BLL.ResponseDTO
{
    public class EventRequestDTO
    {
        public string Title { get; init; }
        public int UserId { get; init; }
        public EventType Type { get; init; }
    }
}
