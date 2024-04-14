using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("GROUPS")]
    public class Group : IEntityTypeConfiguration<Group>
    {
        [Key, Column("ID")]
        public int Id { get; set; }
        
        [MaxLength(50)]
        public string Name { get; set; }

        public int? EventId { get; set; }
        [ForeignKey(nameof(EventId))]
        public Event Event { get; set; }

        [Required]
        public IEnumerable<User> Users { get; set; }        
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.HasOne(x => x.Event).WithOne(x => x.Group).OnDelete(DeleteBehavior.Restrict);
        }
    }
}