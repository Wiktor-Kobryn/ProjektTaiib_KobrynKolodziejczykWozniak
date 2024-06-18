using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Model
{
    public enum EventType
    {
        chart, task, activity
    }

    [Table("EVENTS")]
    public class Event : IEntityTypeConfiguration<Event>
    {
        [Key, Column("ID")]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }

        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public int? GroupId { get; set; }
        [ForeignKey(nameof(GroupId))]
        public Group Group { get; set; }

        public DateTime CreationDate { get; set; }

        public EventType Type { get; set; }

        public ICollection<EventTask> EventTasks { get; set; }

        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasOne(x => x.User).WithMany(x => x.Events).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.Group).WithOne(x => x.Event).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
