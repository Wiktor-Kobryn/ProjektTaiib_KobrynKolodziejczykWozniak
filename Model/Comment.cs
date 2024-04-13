using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("COMMENTS")]
    public class Comment : IEntityTypeConfiguration<Comment> 
    {
        [Key, Column("ID")]
        public int Id { get; set; }

        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public int EventTaskId { get; set; }
        [ForeignKey(nameof(EventTaskId))]
        public EventTask EventTask { get; set; }

        [Required, MaxLength(200)]
        public string Body { get; set; }

        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasOne(x => x.User).WithMany(x => x.Comments).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.EventTask).WithMany(x => x.Comments).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
