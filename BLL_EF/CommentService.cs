using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class CommentService : ICommentService
    {
        private readonly CheckChartContext db;

        public CommentService(CheckChartContext db)
        {
            this.db = db;
        }

        public bool AddComment(CommentRequestDTO commentRequest)
        {
            var user = db.Users.Find(commentRequest.UserId);
            if (user == null)
                return false;

            var eventTast = db.EventTasks.Find(commentRequest.EventTaskId);
            if (eventTast == null)
                return false;

            Comment comment = new()
            {
                Body = commentRequest.Body,
                EventTaskId = commentRequest.EventTaskId,
                UserId = commentRequest.UserId,
            };
            db.Comments.Add(comment);
            db.SaveChanges();
            return true;
        }

        public bool ChangeCommentBody(int commentId, string body)
        {
            var comment = db.Comments.Find(commentId);
            if(comment == null)
                return false;

            if(body== null)
                return false;

            comment.Body=body;
            db.SaveChanges();
            return true;
        }

        public bool DeleteComment(int commentId)
        {
            var comment = db.Comments.Find(commentId);
            if(comment == null)
                return false;

            db.Comments.Remove(comment);
            db.SaveChanges();
            return true;
        }

        public IEnumerable<CommentResponseDTO> GetEventTaskComment(int eventTaskId)
        {
            var e = db.EventTasks.Find(eventTaskId);
            if (e == null)
                throw new Exception("Brak tasku");

            var coms = db.Comments.Where(i=>i.EventTaskId==eventTaskId).ToList();
            return ToCommentResponseDTO(coms);
        }

        IEnumerable<CommentResponseDTO> ToCommentResponseDTO(List<Comment> comments)
        {
            List<CommentResponseDTO> result = new List<CommentResponseDTO>();
            foreach (var comment in comments)
            {
                var c = new CommentResponseDTO
                {
                    Id = comment.Id,
                    EventTaskId = comment.EventTaskId,
                    Body = comment.Body,
                    UserId = comment.UserId,
                };
                result.Add(c);
            }
            return result;
        }
    }
}
