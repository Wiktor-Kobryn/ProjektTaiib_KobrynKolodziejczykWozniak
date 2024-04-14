using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPost("AddComment")]
        public void AddComment([FromQuery] CommentRequestDTO commentRequestDTO)
        {
            commentService.AddComment(commentRequestDTO);
        }

        [HttpPut("ChangeComment")]
        public void ChangeCommentBody([FromQuery] int commentId, string body)
        {
            commentService.ChangeCommentBody(commentId, body);
        }

        [HttpDelete("DeleteComment")]
        public void DeleteComment([FromQuery] int commentId)
        {
            commentService.DeleteComment(commentId);
        }

        [HttpGet("GetEventTaskComments")]
        public IEnumerable<CommentResponseDTO> getEventTaskComments([FromQuery] int taskId) 
        {
            return commentService.GetEventTaskComment(taskId);
        }
    }
}
