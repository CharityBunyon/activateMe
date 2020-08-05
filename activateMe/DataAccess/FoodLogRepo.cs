using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using activateMe.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;

namespace activateMe.DataAccess
{
    public class FoodLogRepo
    {
        string ConnectionString;

        public FoodLogRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<FoodLog> GetAllLogs()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<FoodLog>("select * from FoodLog");
            }
        }

        public IEnumerable<FoodLog> GetUserLogsById(int userId)
        {
            var sql = @"select * 
                        from FoodLog
                        where UserId = @userId";

            var parameters = new {UserId = userId};
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<FoodLog>(sql, parameters);

            }
        }



        public string DeleteLog(int id)
        {
            var sql = @"delete 
                        from FoodLog
                        where id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new {id = id});
                return ($"Succesfully deleted a food item from your log.");
            }
        }

        public FoodLog AddFoodLog(FoodLog foodToAdd)
        {
            var sql = @"insert into FoodLog(Name, FoodTypeId, Quantity, Calories, Points, Carbs, Fats, Protein, UserId)
                        output inserted. *
                        values(@Name, @FoodTypeId, @Quantity, @Calories, @Points, @Carbs, @Fats, @Protein, @UserId )";

            var multiplierQuery = @"select PointMultiplier
                                    from FoodType
                                    where id = @FoodTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var multiplier = db.QueryFirstOrDefault<int>(multiplierQuery, new {foodTypeId = foodToAdd.FoodTypeId});
                var points = foodToAdd.Quantity * multiplier;
                var parameters = new
                {
                    foodToAdd.Name,
                    foodToAdd.FoodTypeId,
                    foodToAdd.Quantity,
                    foodToAdd.Calories,
                    foodToAdd.Carbs,
                    foodToAdd.Protein,
                    foodToAdd.Fats,
                    foodToAdd.UserId,
                    points = points
                };
                    var result = db.QueryFirstOrDefault<FoodLog>(sql, parameters);
                return result;
            }
        }


        public int? GetAllFoodCaloriesForUser(int uid)
        {
            var sql = @"select SUM(calories) as Calories
                        from FoodLog
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.QueryFirstOrDefault<int?>(sql, parameters);

            }
        }

        public int? GetUserPoints(int id)
        {
            var sql = @"select SUM(points) as points
                        from FoodLog
                        where userId = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new  { Id = id };
                return db.QueryFirstOrDefault<int?>(sql, parameters);
            }
        }

        public int? GetAllCarbsUser(int uid)
        {
            var sql = @"select SUM(carbs) as Carbs
                        from FoodLog
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.QueryFirstOrDefault<int?>(sql, parameters);

            }
        }

        public int? GetAllFatsUser(int uid)
        {
            var sql = @"select SUM(fats) as Fats
                        from FoodLog
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.QueryFirstOrDefault<int?>(sql, parameters);

            }
        }

        public int? GetAllProteinUser(int uid)
        {
            var sql = @"select SUM(protein) as Protein
                        from FoodLog
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.QueryFirstOrDefault<int?>(sql, parameters);

            }
        }

    }
}
