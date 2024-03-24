using UmarAppApi.Models.Products;

namespace UmarAppApi.Models.Sales
{
    public class Sale
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime SaleDate { get; set; }
    }
}
