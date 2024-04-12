using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazaDanych
{
    public class Friendship
    {
        [Key]
        public int Id { get; set; }
        public int UserID1 { get; set; }
        [ForeignKey(nameof(UserID1))]
        public User User1 { get; set; }
        public int UserID2 { get; set; }
        [ForeignKey(nameof(UserID2))]
        public User User2 { get; set; }
    }
}
