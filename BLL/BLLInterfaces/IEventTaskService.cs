using BLL.ResponseDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BLLInterfaces
{
    public interface IEventTaskService
    {
        bool AddEventTask(int userId, EventTaskRequestDTO eventTaskRequest);
        bool AddUserToEventTask(int userId, int eventTaskId);
        bool ChangeEventTask(int eventTaskId, EventTaskRequestDTO eventTaskRequest);
        bool DeleteEventTask(int eventTaskId);
        bool ChangeFinishStateEventTask(int eventTaskId);
        IEnumerable<EventTaskResponseDTO> GetUserEventTasks(int userId);
        IEnumerable<EventTaskResponseDTO> GetEventEventTasks(int eventId);
        IEnumerable<CommentResponseDTO> GetEventTaskComment(int eventTaskId);
    }
}
