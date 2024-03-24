using Microsoft.EntityFrameworkCore;
using UmarAppApi.Data;
using UmarAppApi.Models.Products;
using UmarAppApi.Models.Purchases;

namespace UmarAppApi.Services
{
    public class ProductsService
    {
          private readonly InventoryManagementContext _context;

          public ProductsService(InventoryManagementContext context)
          {
              _context = context;
          }

          public async Task<List<Product>> GetProducts()
          {
              return await _context.Products.ToListAsync();
          }

          public async Task<Product> GetProductById(Guid id)
          {
              return await _context.Products.FindAsync(id);
          }

        /// <summary>
        /// gets product in the parameter and adds it into databse
        /// </summary>
        /// <param name="product"></param>
        /// <returns>ProductDto</returns>
        public async Task<ProductDto> AddProduct(ProductDto product)
          {
            var newProduct = new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Quantity = product.Quantity,
                Price = product.Quantity
            };
            _context.Products.Add(newProduct);
              await _context.SaveChangesAsync();
              return product;
          }

          public async Task UpdateProduct(Product product)
          {
               _context.Entry(product).State = EntityState.Modified;
               await _context.SaveChangesAsync();
          }

          public async Task DeleteProduct(Guid id)
          {
              var product = await _context.Products.FindAsync(id);
              if (product != null)
              {
                  _context.Products.Remove(product);
                  await _context.SaveChangesAsync();
              }
          } 
    }
}
