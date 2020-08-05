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
                return db.Query<Badges>("select * from badge");
            }
        }

        public IEnumerable<Badges> RevealBadges(int id)
        {
            var sql = @"declare @foodPoints int 
                        declare @workoutPoints int 

                        select 
                        @foodPoints = sum(points)
                        from FoodLog
                        where userId = @id

                        select 
                        @workoutPoints = sum(points)
                        from WorkoutLog
                        where userId = @id


                        select *
                        from Badge b
                        where @foodPoints + @workoutPoints >= b.pointValue
                        ";
            


            var parameters = new {Id = id};
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Badges>(sql, parameters);
            }
        }
    }


}
