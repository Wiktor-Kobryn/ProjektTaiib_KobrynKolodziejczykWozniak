using BLL.BLLInterfaces;
using BLL.ResponseDTO;
using DAL;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class EventTaskService : IEventTaskService
    {
        private readonly CheckChartContext db;

        public EventTaskService(CheckChartContext db)
        {
            this.db = db;
        }

        public bool AddEventTask(int userId, EventTaskRequestDTO eventTaskRequest)
        {
            var u = db.Users.Find(userId);
            if (u == null)
                return false;

            var e = db.Events.Find(eventTaskRequest.EventId);
            if (e == null)
                return false;

            ICollection<User> users = new List<User>();
            users.Add(u);

            EventTask eventTask = new()
            {
                EventId = eventTaskRequest.EventId,
                Body = eventTaskRequest.Body,
                Deadline = eventTaskRequest.Deadline,
                State = eventTaskRequest.IsFinished,
                CreationDate = DateTime.Now,
                Users = users
            };

            db.EventTasks.Add(eventTask);
            db.SaveChanges();
            return true;
        }

        public bool AddUserToEventTask(int userId, int eventTaskId)
        {
            var u = db.Users.Find(userId);
            if (u == null)
                return false;

            var e = db.EventTasks.Find(eventTaskId);
            if (e == null)
                return false;

            e.Users.Add(u);

            db.SaveChanges();
            return true;
        }

        public bool ChangeEventTask(int eventTaskId, EventTaskRequestDTO eventTaskRequest)
        {
            var e = db.EventTasks.Find(eventTaskId);
            if (e == null)
                return false;

            if (eventTaskRequest.Deadline < DateTime.Now)
                return false;

            if (eventTaskRequest.Body == null)
                return false;

            e.Deadline = eventTaskRequest.Deadline;
            e.Body = eventTaskRequest.Body;

            db.SaveChanges();
            return true;
        }

        public bool DeleteEventTask(int eventTaskId)
        {
            var e = db.EventTasks.Find(eventTaskId);
            if (e == null)
                return false;

            List<Comment> comments = db.Comments.Where(c => c.EventTaskId == eventTaskId).ToList();
            foreach (var comment in comments)
            {
                db.Comments.Remove(comment);
            }
            db.EventTasks.Remove(e);
            db.SaveChanges();
            return true;
        }

        public bool ChangeFinishStateEventTask(int eventTaskId)
        {
            var e = db.EventTasks.Find(eventTaskId);
            if (e == null)
                return false;

            //e.State = !e.State;
            if(e.State) e.State = false;
            else e.State = true;

            db.SaveChanges();
            return true;
        }

        public IEnumerable<EventTaskResponseDTO> GetEventEventTasks(int eventId)
        {
            var e = db.Events.Find(eventId);
            if (e == null)
                return null;

            var eventTasks = db.EventTasks.Where(i => i.EventId == eventId);
            return ToEventTaskResponseDTO(eventTasks);
        }

        public IEnumerable<EventTaskResponseDTO> GetUserEventTasks(int userId)
        {
            var u = db.Users.Find(userId);
            if (u == null)
                return null;
            var eventTasks = db.EventTasks.Where(x => x.Users.Contains(u));

            return ToEventTaskResponseDTO(eventTasks);
        }

        public IEnumerable<CommentResponseDTO> GetEventTaskComment(int eventTaskId)
        {
            var e = db.EventTasks.Find(eventTaskId);
            if (e == null)
                return null;
            var coms = db.Comments.Where(i => i.EventTaskId == eventTaskId).ToList();
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

        IEnumerable<EventTaskResponseDTO> ToEventTaskResponseDTO(IEnumerable<EventTask> eventTasks)
        {
            List<EventTaskResponseDTO> eventTaskResponseDTOs = new();
            foreach(var eventTask in eventTasks)
            {
                var e = new EventTaskResponseDTO
                {
                    Id = eventTask.Id,
                    EventId = eventTask.Id,
                    Body = eventTask.Body,
                    CreationDate = eventTask.CreationDate,
                    Deadline = eventTask.Deadline,
                    IsFinished = eventTask.State
                };
                eventTaskResponseDTOs.Add(e);
            }
            return eventTaskResponseDTOs;
        }
    }
}
