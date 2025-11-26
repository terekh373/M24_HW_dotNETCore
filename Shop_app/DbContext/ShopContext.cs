using Microsoft.EntityFrameworkCore;
using Shop_app.Models;

public class ShopContext : DbContext
{
    public ShopContext(DbContextOptions<ShopContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //One to many (Order-OrderDetail)
        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderDetails) //one Order many OrderDetail
            .WithOne(od => od.Order) //one OrderDetail has one Order
            .HasForeignKey(od => od.OrderId)
            .OnDelete(DeleteBehavior.Cascade); //If delete order and delete OrderDetail
        //Many to one
        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Product)
            .WithMany()
            .HasForeignKey(od => od.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        //Many to One
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany()
            .HasForeignKey(o => o.UserId);
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
}
