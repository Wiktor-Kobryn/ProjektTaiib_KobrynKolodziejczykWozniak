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
    public class Task
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Body { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime CreationTime { get; set; }
        public bool Sate { get; set; }   
    }
}
