using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class CommentsController : ControllerBase
    {
        readonly ICommentService commentService;

        public CommentsController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPost]
        public void AddComment([FromBody] CommentRequestDTO commentRequestDTO)
        {
            commentService.AddComment(commentRequestDTO);
        }

        [HttpPut("ChangeBody/{id}")]
        public void ChangeCommentBody(int id, [FromBody]string body)
        {
            commentService.ChangeCommentBody(id, body);
        }

        [HttpDelete("{id}")]
        public void DeleteComment(int id)
        {
            commentService.DeleteComment(id);
        }

    }
}
