namespace Shop_app.Models
{
    public class OrderRequest
    {
        public string? UserId { get; set; }
        public IEnumerable<CartItem>? CartItems { get; set; }
    }
}
