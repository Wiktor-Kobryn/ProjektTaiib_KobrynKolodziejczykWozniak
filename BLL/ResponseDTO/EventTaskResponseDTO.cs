using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ResponseDTO
{
    public class EventTaskResponseDTO
    {
        public int Id { get; init; }
        public int EventId { get; init; }
        public string Body { get; set; }
        public DateTime Deadline { get; init; }
        public DateTime CreationDate { get; init; }
        public bool IsFinished { get; init; }      
    }
}
