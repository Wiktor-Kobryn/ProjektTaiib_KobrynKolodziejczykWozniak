using BLL.ResponseDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BLLInterfaces
{
    public interface IEventService
    {
        bool AddEvent(EventRequestDTO eventRequest);
        bool ChangeEventTitle(int eventId, string title);
        bool DeleteEvent(int eventId);
        IEnumerable<EventResponseDTO> GetUserEvents(int userId);
        EventResponseDTO GetGroupEvent(int groupId);
        EventResponseDTO GetEvent(int eventId);
    }
}
