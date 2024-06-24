using BLL.ResponseDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BLLInterfaces
{
    public interface ICommentService
    {
        bool AddComment(CommentRequestDTO commentRequest);
        bool ChangeCommentBody(int commentId, string body);
        bool DeleteComment(int commentId);
    }
}
