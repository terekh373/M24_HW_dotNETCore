using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop_app.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Display(Name = "Order date")]
        public DateTime OrderDate { get; set; }
        [Display(Name = "Total amount")]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalAmount { get; set; }
        [Display(Name = "Status")]
        public string? Status { get; set; }
        public string? UserId { get; set; }
        //Navigation property
        [ForeignKey("UserId")]
        public ApplicationUser? User { get; set; }
        //Navigation property
        public ICollection<OrderDetail>? OrderDetails { get; set; }
    }
}
