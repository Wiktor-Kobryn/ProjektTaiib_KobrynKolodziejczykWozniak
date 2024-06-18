using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using BLL_EF;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventTasksController : ControllerBase
    {
        readonly IEventTaskService eventTaskService;

        public EventTasksController(IEventTaskService eventTaskService)
        {
            this.eventTaskService = eventTaskService;
        }

        [HttpPost("{userId}")]
        public void AddEventTask(int userId, [FromBody] EventTaskRequestDTO eventTaskRequestDTO)
        {
            eventTaskService.AddEventTask(userId, eventTaskRequestDTO);
        }

        [HttpPost("{userId}/{eventTaskId}")]
        public void AddUserToEventTask(int userId, int eventTaskId)
        {
            eventTaskService.AddUserToEventTask(userId, eventTaskId);
        }

        [HttpPut("{id}")]
        public void ChangeEventTask(int id, [FromBody] EventTaskRequestDTO eventTaskRequestDTO)
        {
            eventTaskService.ChangeEventTask(id, eventTaskRequestDTO);
        }

        [HttpDelete("{id}")]
        public void DeleteEventTask(int id)
        {
            eventTaskService.DeleteEventTask(id);
        }

        [HttpPut("Finish/{id}")]
        public void FinishEventTask(int id) 
        {
            eventTaskService.ChangeFinishStateEventTask(id);
        }

        [HttpGet("user/{userId}")]
        public IEnumerable<EventTaskResponseDTO> GetUserEventTasks(int userId)
        {
            return eventTaskService.GetUserEventTasks(userId);
        }

        [HttpGet("event/{eventId}")]
        public IEnumerable<EventTaskResponseDTO> GetEventEventTasks(int eventId)
        {
            return eventTaskService.GetEventEventTasks(eventId);
        }

        [HttpGet("{id}/Comments")]
        public IEnumerable<CommentResponseDTO> getEventTaskComments(int id)
        {
            return eventTaskService.GetEventTaskComment(id);
        }
    }
}
