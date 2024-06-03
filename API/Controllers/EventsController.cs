using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {

        readonly IEventService eventService;

        public EventsController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        [HttpPost]
        public void AddEvent([FromBody] EventRequestDTO eventRequestDTO)
        {
            eventService.AddEvent(eventRequestDTO);
        }

        [HttpPut("ChangeTitle/{id}")]
        public void ChangeEventTitle(int id, [FromBody]string title) 
        {
            eventService.ChangeEventTitle(id, title);
        }

        [HttpDelete("{id}")]
        public void DeleteEvent(int id)
        {
            eventService.DeleteEvent(id);
        }

        [HttpGet("user/{userId}")]
        public IEnumerable<EventResponseDTO> GetUserEvents(int userId)
        {
            return eventService.GetUserEvents(userId);
        }

        [HttpGet("group/{groupId}")]
        public EventResponseDTO GetGroupEvent(int groupId)
        {
            return eventService.GetGroupEvent(groupId);
        }

        [HttpGet("{eventId}")]
        public EventResponseDTO GetEvent(int eventId)
        {
            return eventService.GetEvent(eventId);
        }
    }
}
