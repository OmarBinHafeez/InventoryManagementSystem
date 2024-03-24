using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UmarAppApi.Models.Purchases;
using UmarAppApi.Services;

namespace UmarAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly PurchasesService _purchasesService;

        public PurchasesController(PurchasesService purchasesService)
        {
            _purchasesService = purchasesService;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<List<PurchaseOutputDto>>> GetPurchases()
        {
            return await _purchasesService.GetPurchases();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(Guid id)
        {
            var purchase = await _purchasesService.GetPurchaseById(id);
            if (purchase == null)
            {
                return NotFound();
            }
            return purchase;
        }

        // POST: api/Purchases
        [HttpPost]
        public async Task<ActionResult<PurchaseDto>> AddPurchase(PurchaseDto purchase)
        {
            return await _purchasesService.AddPurchase(purchase);
        }

        // PUT: api/Purchases/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePurchase(Guid id, Purchase purchase)
        {
            if (id != purchase.Id)
            {
                return BadRequest();
            }

            await _purchasesService.UpdatePurchase(purchase);

            return NoContent();
        }

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchase(Guid id)
        {
            await _purchasesService.DeletePurchase(id);
            return NoContent();
        }
    }
}
