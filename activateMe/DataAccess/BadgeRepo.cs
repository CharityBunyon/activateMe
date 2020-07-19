using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using activateMe.Models;
using Dapper;
using System.Data.SqlClient;

namespace activateMe.DataAccess
{
    public class BadgeRepo
    {
        string ConnectionString;

        public BadgeRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<Badges> GetAllBadges()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Badges>("select * from badges");
            }
        }

        //public Badges RevealBadges()
        //{

        //}
    }


}
