using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using UmarAppApi.Models.Products;
using UmarAppApi.Models.Purchases;
using UmarAppApi.Models.Sales;

namespace UmarAppApi.Data
{
    public class InventoryManagementContext : DbContext
    {
        public InventoryManagementContext(DbContextOptions<InventoryManagementContext> options)
          : base(options)
        { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Purchase> Purchases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasKey(e => e.Id);
            });

            modelBuilder.Entity<Sale>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd(); // Set primary key for Sale
                entity.HasKey(e => e.Id); // Define primary key for Sale
            });

            modelBuilder.Entity<Purchase>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd(); // Set primary key for Purchase
                entity.HasKey(e => e.Id); // Define primary key for Purchase            
            });
        }
    }
}
