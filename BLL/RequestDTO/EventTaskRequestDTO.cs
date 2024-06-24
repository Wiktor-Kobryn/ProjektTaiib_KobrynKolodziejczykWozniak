using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ResponseDTO
{
    public class EventTaskRequestDTO
    {
        public int EventId { get; init; }
        public string Body { get; set; }
        public DateTime Deadline { get; init; }
        public bool IsFinished { get; init; }      
    }
}
