namespace UmarAppApi.Models.Purchases
{
    public class PurchaseDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
