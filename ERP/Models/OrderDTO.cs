namespace api.Models
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public string Status { get; set; } = "Processing";
        public DateTime OrderDate { get; set; }
    }
}