using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using UmarAppApi.Data;
using UmarAppApi.Models.Purchases;
using UmarAppApi.Models.Sales;

namespace UmarAppApi.Services
{
    public class PurchasesService
    {
        private readonly InventoryManagementContext _context;

        public PurchasesService(InventoryManagementContext context)
        {
            _context = context;
        }

        /// <summary>
        ///  Returns the list of Purchases , adds the name of product against each purchase first
        /// </summary>
        /// <returns>PurchaseOutputDto</returns>
        public async Task<List<PurchaseOutputDto>> GetPurchases()
        {
            List<PurchaseOutputDto> purchaseOutputDtos = new List<PurchaseOutputDto>();
            var allPurchase  = await _context.Purchases.ToListAsync();
            foreach (var purchase in allPurchase)
            {
                var product = await _context.Products.FindAsync(purchase.ProductId);
                var purchases = new PurchaseOutputDto
                {
                    Id = purchase.Id,
                    ProductId = purchase.ProductId,
                    ProductName = product.Name,
                    Quantity = purchase.Quantity,
                    Price = purchase.Price,
                    TotalAmount = purchase.TotalAmount,
                    PurchaseDate = purchase.PurchaseDate
                };
                purchaseOutputDtos.Add(purchases);
            }
            return purchaseOutputDtos;
        }

        public async Task<Purchase> GetPurchaseById(Guid id)
        {
            return await _context.Purchases.FindAsync(id);
        }

        public async Task<PurchaseDto> AddPurchase(PurchaseDto purchase)
        {
            var newPurchase = new Purchase()
            {
                ProductId = purchase.ProductId,
                Quantity = purchase.Quantity,
                Price = purchase.Quantity,
                TotalAmount = purchase.TotalAmount,
                PurchaseDate = purchase.PurchaseDate
            };
            _context.Purchases.Add(newPurchase);
            await _context.SaveChangesAsync();
            return purchase;
        }

        public async Task UpdatePurchase(Purchase purchase)
        {
            _context.Entry(purchase).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePurchase(Guid id)
        {
            var purchase = await _context.Purchases.FindAsync(id);
            if (purchase != null)
            {
                _context.Purchases.Remove(purchase);
                await _context.SaveChangesAsync();
            }
        }
    }
}
