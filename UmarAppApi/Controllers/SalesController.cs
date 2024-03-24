using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UmarAppApi.Models.Sales;
using UmarAppApi.Services;

namespace UmarAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly SalesService _salesService;

        public SalesController(SalesService salesService)
        {
            _salesService = salesService;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<List<SaleOutputDto>>> GetSales()
        {
            return await _salesService.GetSales();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(Guid id)
        {
            var sale = await _salesService.GetSaleById(id);
            if (sale == null)
            {
                return NotFound();
            }
            return sale;
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<SaleDto>> AddSale(SaleDto sale)
        {
            return await _salesService.AddSale(sale);
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSale(Guid id, Sale sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            await _salesService.UpdateSale(sale);

            return NoContent();
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(Guid id)
        {
            await _salesService.DeleteSale(id);
            return NoContent();
        }
    }
}
