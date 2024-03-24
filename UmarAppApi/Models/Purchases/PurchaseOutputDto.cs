namespace UmarAppApi.Models.Purchases
{
    public class PurchaseOutputDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
