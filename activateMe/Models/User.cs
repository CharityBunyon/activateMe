using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace activateMe.Models
{
    public class User
    {
        public int id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public DateTime dateJoined { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string imageUrl { get; set; }
        public  int points { get; set; }
    }
}
