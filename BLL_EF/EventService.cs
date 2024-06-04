using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class EventService : IEventService
    {
        private readonly CheckChartContext db;

        public EventService(CheckChartContext db)
        {
            this.db = db;
        }

        public bool AddEvent(EventRequestDTO eventRequest)
        {
            var u = db.Users.Find(eventRequest.UserId);
            if (u == null)
                return false;

            Event e = new()
            {
                CreationDate = DateTime.Now,
                Title = eventRequest.Title,
                UserId = eventRequest.UserId,
                Type = eventRequest.Type
            };
            db.Events.Add(e);
            db.SaveChanges();
            return true;
        }

        public bool ChangeEventTitle(int eventId, string title)
        {
            var e = db.Events.Find(eventId);
            if(e == null)
                return false;

            e.Title = title;
            db.SaveChanges();
            return true;
        }

        public bool DeleteEvent(int eventId)
        {
            var e = db.Events.Find(eventId);
            if (e == null)
                return false;

            
            
            List<EventTask> eventTasks = db.EventTasks.Where(i=>i.EventId==eventId).ToList();

            foreach(var t in eventTasks)
            {
                List<Comment> comments = db.Comments.Where(c=>c.EventTaskId==t.EventId).ToList();
                foreach(var c in comments)
                {
                    db.Comments.Remove(c);
                }
                db.EventTasks.Remove(t);
            }

            var g = db.Groups.Find(e.GroupId);
            
            if (g != null) db.Groups.Remove(g);
            db.SaveChanges();
            db.Events.Remove(e);
            db.SaveChanges();
            return true;
        }

        public int GetContributorsSize(int eventId)
        {
            var g = db.Groups.FirstOrDefault(g => g.EventId == eventId);
            if (g == null)
                throw new Exception("Brak grupy");

            var users = db.Users.Where(u => u.Groups.Contains(g)).ToList();
            if (users == null)
                throw new Exception("Blad");
            return users.Count;
        }

        public EventResponseDTO GetGroupEvent(int groupId)
        {
            var g = db.Groups.Find(groupId);
            if (g == null)
                throw new Exception("Brak grupy");

            var e = db.Events.Where(ev=>ev.GroupId==groupId).First();
            return ToEventResponseDTO(e);
        }

        public IEnumerable<EventResponseDTO> GetUserEvents(int userId)
        {
            var u = db.Users.Find(userId);
            if(u == null)
                throw new Exception("Brak uzytkownika");

            var events = db.Events.Where(ev => ev.UserId == userId);
            return ToEventsResponseDTO(events);
        }

        public EventResponseDTO GetEvent(int eventId) 
        { 
            var e = db.Events.FirstOrDefault(e => e.Id == eventId);
            if (e == null)
                throw new Exception("Brak eventu");
            return ToEventResponseDTO(e);
        }

        EventResponseDTO ToEventResponseDTO(Event ev)
        {
            EventResponseDTO eventResponseDTO = new()
            {
                Id = ev.Id,
                Title = ev.Title,
                GroupId = ev.GroupId,
                UserId = ev.UserId,
                CreationDate = ev.CreationDate,
                Type = ev.Type
            };
            return eventResponseDTO;
        }

        IEnumerable<EventResponseDTO> ToEventsResponseDTO(IEnumerable<Event> events)
        {
            List<EventResponseDTO> result = new();
            foreach (var ev in events)
            {
                var e = new EventResponseDTO
                {
                    Id = ev.Id,
                    Title = ev.Title,
                    GroupId = ev.GroupId,
                    UserId = ev.UserId,
                    CreationDate = ev.CreationDate,
                    Type = ev.Type
                };
                result.Add(e);
            }
            return result;
        }
    }
}
