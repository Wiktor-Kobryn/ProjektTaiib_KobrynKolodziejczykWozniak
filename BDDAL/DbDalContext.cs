
using BazaDanych;
using Microsoft.EntityFrameworkCore;

namespace BDDAL
{
    public class DbDalContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Event> Events { get; set; }

        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<BazaDanych.Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

        //Connection String
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=AB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

            //  optionsBuilder.UseSqlServer("Server=localhost; Database=SklepInternetowyKK; TrustServerCertificate=True;");

        }


    }
}