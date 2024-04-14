using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        readonly IEventService eventService;

        public EventController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        [HttpPost("AddEvent")]
        public void AddEvent([FromQuery] EventRequestDTO eventRequestDTO)
        {
            eventService.AddEvent(eventRequestDTO);
        }

        [HttpPut("ChangeEventTitle")]
        public void ChangeEventTitle([FromQuery] int eventId, string title) 
        {
            eventService.ChangeEventTitle(eventId, title);
        }

        [HttpDelete("DeleteEvent")]
        public void DeleteEvent([FromQuery] int eventId)
        {
            eventService.DeleteEvent(eventId);
        }

        [HttpGet("GetUserEvents")]
        public IEnumerable<EventResponseDTO> GetUserEvents([FromQuery] int userId)
        {
            return eventService.GetUserEvents(userId);
        }

        [HttpGet("GetGroupEvent")]
        public EventResponseDTO GetGroupEvent([FromQuery] int groupId)
        {
            return eventService.GetGroupEvent(groupId);
        }

    }
}
