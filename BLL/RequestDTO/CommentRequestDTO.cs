using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ResponseDTO
{
    public class CommentRequestDTO
    {
        public int UserId { get; init; }
        public int EventTaskId { get; init; }
        public string Body { get; init; }
    }
}
