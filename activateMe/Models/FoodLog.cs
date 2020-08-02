using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace activateMe.Models
{
    public class FoodLog
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FoodTypeId { get; set; }
        public int Quantity { get; set; }
        public int? Calories { get; set; }
        public int? Points { get; set; }
        public int UserId { get; set; }
        public int? Carbs { get; set; }
        public int? Fats { get; set; }
        public int? Protein { get; set; }
    }
}
