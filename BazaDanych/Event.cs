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
    public enum TypesOfEvent
    {
        chart, task, activity

    }
    public class Event
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        public string Title { get; set; }
        public int UserID { get; set; }
        [ForeignKey(nameof(UserID))]
        public User Users { get; set; }

        ICollection<Group> GroupsId { get; set; }
        public DateTime CreationDate {get; set; }
        public TypesOfEvent Type { get; set; }
    }
}
