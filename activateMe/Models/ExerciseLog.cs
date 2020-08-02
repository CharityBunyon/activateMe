using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace activateMe.Models
{
    public class ExerciseLog
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int CategoryTypeId { get; set; }
        public int Time { get; set; }
        public int? Calories { get; set; }
        public int? Points { get; set; }
        public int UserId { get; set; }
    }
}
