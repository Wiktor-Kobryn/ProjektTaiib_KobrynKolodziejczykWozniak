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
    public class Comment 
    {
        [Key]
        public int Id { get; set; }

        public int UserID { get; set; }
        [ForeignKey(nameof(UserID))]
        public User User { get; set; }
        public int TaskID { get; set; }
        [ForeignKey(nameof(TaskID))]
        public Task Task { get; set; }

        [MaxLength(500)]
        public string Body { get; set; }
    }
}
