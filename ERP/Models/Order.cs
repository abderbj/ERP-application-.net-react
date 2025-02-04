using System;
using System.Collections.Generic;

namespace api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public required Client Client { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
        public string Status { get; set; } = "Processing"; 
        public DateTime OrderDate { get; set; }
    }
}