using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop_app.Models;
using Shop_app.Services;
using System.Collections.Generic;

namespace Shop_app.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIOrderController : Controller
    {
        private readonly IOrderService _orderService;
        public APIOrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderRequest orderRequest)
        {
            if(orderRequest != null)
            {
                string userId = orderRequest.UserId;
                List<CartItem> cartItems = orderRequest.CartItems as List<CartItem>;
                return Ok(_orderService.PlaceOrderAsync(userId, cartItems));
            }
            //Через фронтенд додати замовлення в таблицю Orders
            //Скинути фото 
            return BadRequest("Error ...");
        }
    }
}
