using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using UmarAppApi.Data;
using UmarAppApi.Models.Purchases;
using UmarAppApi.Models.Sales;

namespace UmarAppApi.Services
{
    public class SalesService
    {
        private readonly InventoryManagementContext _context;

        public SalesService(InventoryManagementContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns the list of Sales , adds the name of product against each sale first
        /// </summary>
        /// <returns>SaleOutputDto</returns>
        public async Task<List<SaleOutputDto>> GetSales()
        {
            List<SaleOutputDto> salesOutput = new List<SaleOutputDto>();
            var allSales = await _context.Sales.ToListAsync();
            foreach (var sale in allSales)
            {
                var product = await _context.Products.FindAsync(sale.ProductId);
                var sales = new SaleOutputDto
                {
                    Id = sale.Id,
                    ProductId = sale.ProductId,
                    ProductName = product.Name,
                    Quantity = sale.Quantity,
                    Price = sale.Price,
                    TotalAmount = sale.TotalAmount,
                    SaleDate = sale.SaleDate
                };
                salesOutput.Add(sales);
            }
            return salesOutput;
        }

        public async Task<Sale> GetSaleById(Guid id)
        {
            return await _context.Sales.FindAsync(id);
        }

        public async Task<SaleDto> AddSale(SaleDto sale)
        {
            var newSale = new Sale()
            {
                ProductId = sale.ProductId,
                Quantity = sale.Quantity,
                Price = sale.Quantity,
                TotalAmount = sale.TotalAmount,
                SaleDate = sale.SaleDate
            };
            _context.Sales.Add(newSale);
            await _context.SaveChangesAsync();
            return sale;
        }

        public async Task UpdateSale(Sale sale)
        {
            _context.Entry(sale).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSale(Guid id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale != null)
            {
                _context.Sales.Remove(sale);
                await _context.SaveChangesAsync();
            }
        }
    }
}
