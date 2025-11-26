using Microsoft.AspNetCore.Identity;

namespace Shop_app.Models
{
    public class ApplicationUser : IdentityUser
    {
        //Navigation property
        public ICollection<Order>? Orders { get; set; }
    }
}
