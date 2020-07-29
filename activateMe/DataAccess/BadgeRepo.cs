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

        public IEnumerable<Badges> RevealBadges(int id)
        {
            var sql = @" select *
                        from Badges b
                        where (select sum(points) as points
                        from food 
                        where userId = @id) >= b.pointValue
                        ";
            var parameters = new {Id = id};
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Badges>(sql, parameters);
            }
        }
    }


}
