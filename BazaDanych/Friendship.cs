using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BazaDanych
{
    public class Friendship
    {
        [Key]
        public int Id { get; set; }
        public int UserID1 { get; set; }
        public User User1 { get; set; }
        public int UserID2 { get; set; }
        public User User2 { get; set; }
    }

    public class FriendshipConfiguration : IEntityTypeConfiguration<Friendship>
    {
        public void Configure(EntityTypeBuilder<Friendship> builder)
        {
            // Specify the behavior for cascading actions
            builder.HasOne(f => f.User1)
                .WithMany()
                .HasForeignKey(f => f.UserID1)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(f => f.User2)
                .WithMany()
                .HasForeignKey(f => f.UserID2)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
