using UmarAppApi.Models.Products;

namespace UmarAppApi.Models.Purchases
{
    public class Purchase
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; } 
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
