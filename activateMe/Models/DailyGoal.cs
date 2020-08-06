using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace activateMe.Models
{
    public class DailyGoal
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? Calories { get; set; }
        public int? Carbs { get; set; }
        public int? Fats { get; set; }
        public int? Protein { get; set; }
        public int? Fiber { get; set; }
        public int? Sugar { get; set; }
        public int? Sodium { get; set; }

    }
}
