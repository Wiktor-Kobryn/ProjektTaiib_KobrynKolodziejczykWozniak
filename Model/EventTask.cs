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

        public int EventId { get; set; }
        [ForeignKey(nameof(EventId))]
        public Event Event { get; set; }

        [Required, MaxLength(200)]
        public string Body { get; set; }

        public DateTime Deadline { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsFinished { get; set; } 
        
        public IEnumerable<Comment> Comments { get; set; }
        public IEnumerable<User> Users { get; set; }

        public void Configure(EntityTypeBuilder<EventTask> builder)
        {
            builder.HasOne(u => u.Event).WithMany(x => x.EventTasks).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
