using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UmarAppApi.Models.Products;
using UmarAppApi.Services;

namespace UmarAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsService _productsService;

        public ProductsController(ProductsService productsService)
        {
            _productsService = productsService;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _productsService.GetProducts();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            var product = await _productsService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductDto>> AddProduct(ProductDto product)
        {
            return await _productsService.AddProduct(product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            await _productsService.UpdateProduct(product);

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            await _productsService.DeleteProduct(id);
            return NoContent();
        }
    }
}
