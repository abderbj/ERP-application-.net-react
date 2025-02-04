using api.Models;
using api.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public OrderController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var orders = _context.Orders
                .Include(o => o.Client)
                .Select(o => new OrderDTO
                {
                    OrderId = o.Id,
                    CustomerName = o.Client.Name,
                    Status = o.Status,
                    OrderDate = o.OrderDate
                })
                .ToList();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var order = _context.Orders
                .Include(o => o.Client)
                .Where(o => o.Id == id)
                .Select(o => new OrderDTO
                {
                    OrderId = o.Id,
                    CustomerName = o.Client.Name,
                    Status = o.Status,
                    OrderDate = o.OrderDate
                })
                .FirstOrDefault();

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Order order)
        {
            order.Status = "Processing"; // Set the default status to "Processing"
            _context.Orders.Add(order);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Order order)
        {
            if (order == null || order.Id != id)
            {
                return BadRequest();
            }

            var dbOrder = _context.Orders.Find(id);
            if (dbOrder == null)
            {
                return NotFound();
            }

            dbOrder.ClientId = order.ClientId;
            dbOrder.Status = order.Status;
            dbOrder.OrderDate = order.OrderDate;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut("update-status/{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] string newStatus)
        {
            var dbOrder = _context.Orders.Find(id);
            if (dbOrder == null)
            {
                return NotFound();
            }

            dbOrder.Status = newStatus;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
public IActionResult Delete(int id)
{
    var order = _context.Orders.Include(o => o.Products).FirstOrDefault(o => o.Id == id);
    if (order == null)
    {
        return NotFound();
    }
    // Save changes before deleting the order
    _context.SaveChanges();

    // Now delete the order
    _context.Orders.Remove(order);
    _context.SaveChanges();

    return NoContent();
}


    }
}