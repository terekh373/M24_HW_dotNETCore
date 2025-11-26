using Shop_app.Models;

namespace Shop_app.Services
{
    public interface IOrderService
    {
        Task<Order> PlaceOrderAsync(string userId, List<CartItem> cartItems);
    }
    public class ServiceOrder : IOrderService
    {
        private readonly ShopContext _shopContext;
        public ServiceOrder(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }

        public async Task<Order> PlaceOrderAsync(string userId, List<CartItem> cartItems)
        {
            var newOrder = new Order
            {
                UserId = userId,
                OrderDate = DateTime.Now,
                Status = "Pending",
                OrderDetails = new List<OrderDetail>()
            };
            decimal totalOrderAmount = 0;
            foreach (var item in cartItems)
            {
                var product = await _shopContext.Products.FindAsync(item.ProductId);
                if(product == null)
                {
                    throw new Exception("Product not found ...");
                }
                var detail = new OrderDetail
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price
                };
                newOrder.OrderDetails.Add(detail);
                totalOrderAmount += item.Quantity * item.Price;
            }

            _shopContext.Orders.Add(newOrder);
            await _shopContext.SaveChangesAsync();
            return newOrder;
        }
    }
}
