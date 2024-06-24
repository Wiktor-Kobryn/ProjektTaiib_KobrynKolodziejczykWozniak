using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("EVENT_TASKS")]
    public class EventTask : IEntityTypeConfiguration<EventTask>
    {
        [Key, Column("ID")]
        public int Id { get; set; }

        [ForeignKey(nameof(EventId))]
        public int? EventId { get; set; }
        public Event Event { get; set; }

        [Required, MaxLength(200)]
        public string Body { get; set; }

        public DateTime Deadline { get; set; }
        public DateTime CreationDate { get; set; }
<<<<<<< HEAD
        public bool State { get; set; } 
        
        public ICollection<Comment> Comments { get; set; }
        public ICollection<User> Users { get; set; }

        public void Configure(EntityTypeBuilder<EventTask> builder)
        {
            builder.HasOne(u => u.Event).WithMany(x => x.EventTasks).OnDelete(DeleteBehavior.Cascade);
        
=======
        public bool State { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<User> Users { get; set; } = new List<User>();

        public void Configure(EntityTypeBuilder<EventTask> builder)
        {
            builder.HasOne(u => u.Event).WithMany(x => x.EventTasks).OnDelete(DeleteBehavior.Restrict);

>>>>>>> origin/Wiktor
        }
    }
}
