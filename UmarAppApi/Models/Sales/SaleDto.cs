namespace UmarAppApi.Models.Sales
{
    public class SaleDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime SaleDate { get; set; }
    }
}
