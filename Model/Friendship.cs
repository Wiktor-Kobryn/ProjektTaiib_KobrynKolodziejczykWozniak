using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace Model
{
    [Table("FRIENDSHIPS")]
    public class Friendship
    {
        [Key, Column("ID")]
        public int Id { get; set; }

        //warning - FK not mapped!
        public int? UserAId { get; set; }
        public User UserA { get; set; }
        public int? UserBId { get; set; }
        public User UserB { get; set; }
    }
}
