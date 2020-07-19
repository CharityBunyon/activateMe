using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace activateMe.Models
{
    public class Badges
    {
        public int BadgeId { get; set; }
        public string Name { get; set; }
        public int PointValue { get; set; }
        public string ImageUrl { get; set; }
    }
}
