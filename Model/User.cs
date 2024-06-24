using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("USERS")]
    public class User : IEntityTypeConfiguration<User>
    {
        [Key, Column("ID")]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Login { get; set; }

        [Required, MaxLength(50)]
        public string Password { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Image { get; set; }

        public bool IsAdmin { get; set; }
        public DateTime CreationDate { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<EventTask> EventTasks { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Group> Groups { get; set; }
<<<<<<< HEAD
=======

        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasMany(x => x.EventTasks).WithMany(x => x.Users);
        }
>>>>>>> origin/Wiktor
        //public IEnumerable<Friendship> Friendships { get; set; }

    }
}
