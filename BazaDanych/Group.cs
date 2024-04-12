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
    public class Group
    {
        [Key]
        public int Id { get; set; }

        public int EventID { get; set; }
        [ForeignKey(nameof(EventID))]
        public Event Events { get; set; }
    }
}