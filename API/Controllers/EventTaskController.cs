using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventTaskController : ControllerBase
    {
        readonly IEventTaskService eventTaskService;

        public EventTaskController(IEventTaskService eventTaskService)
        {
            this.eventTaskService = eventTaskService;
        }

        [HttpPost("AddEventTask")]
        public void AddEventTask([FromQuery]int userId, [FromQuery] EventTaskRequestDTO eventTaskRequestDTO)
        {
            eventTaskService.AddEventTask(userId, eventTaskRequestDTO);
        }

        [HttpPut("AddUserToEventTask")]
        public void AddUserToEventTask([FromQuery] int userId, int eventTaskId)
        {
            eventTaskService.AddUserToEventTask(userId, eventTaskId);
        }

        [HttpPut("ChangeEventTask")]
        public void ChangeEventTask([FromQuery] int eventTaskId, [FromQuery] EventTaskRequestDTO eventTaskRequestDTO)
        {
            eventTaskService.ChangeEventTask(eventTaskId, eventTaskRequestDTO);
        }

        [HttpDelete("DeleteEventTask")]
        public void DeleteEventTask([FromQuery] int eventTaskId)
        {
            eventTaskService.DeleteEventTask(eventTaskId);
        }

        [HttpPut("FinishEventTask")]
        public void FinishEventTask([FromQuery] int eventTaskId) 
        {
            eventTaskService.FinishEventTask(eventTaskId);
        }

        [HttpGet("GetUserEventTasks")]
        public IEnumerable<EventTaskResponseDTO> GetUserEventTasks([FromQuery] int userId)
        {
            return eventTaskService.GetUserEventTasks(userId);
        }

        [HttpGet("GetEventEventTasks")]
        public IEnumerable<EventTaskResponseDTO> GetEventEventTasks([FromQuery] int eventId)
        {
            return eventTaskService.GetEventEventTasks(eventId);
        }
    }
}
