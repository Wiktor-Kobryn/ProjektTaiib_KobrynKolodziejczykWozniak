using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Model;

namespace DAL
{
    public class CheckChartContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<EventTask> EventTasks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder
                .UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Kuba\\Desktop\\ProjektTaiib_Kuba\\ProjektTaiib_KobrynKolodziejczykWozniak\\CheckChartDB.mdf;Integrated Security=True;Connect Timeout=30");
        }
    }
}