using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop_app.Models
{
    public class OrderDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        //Navigation property
        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
        //Navigation property
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
    }
}
