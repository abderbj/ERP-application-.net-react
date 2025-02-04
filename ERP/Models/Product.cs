namespace api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string Category {get; set;}
        public int StockLeft { get; set; }
    }
}