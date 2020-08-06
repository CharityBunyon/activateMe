using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using activateMe.Models;
using System.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;
using Dapper;

namespace activateMe.DataAccess
{
    public class DailyGoalRepo
    {
        private string ConnectionString;

        public DailyGoalRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<DailyGoal> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<DailyGoal>("Select * from DailyGoal");
            }
        }

        public DailyGoal GetGoalsById(int userId)
        {
            var sql = @"select * 
                        from DailyGoal
                        where UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var userGoals = db.QueryFirstOrDefault<DailyGoal>(sql, new {UserId = userId});
                return userGoals;
            }
        }


        public DailyGoal UpdateGoal(DailyGoal updatedGoal)
        {
            var sql = @"Update DailyGoal
                        SET UserID = @UserId,
                            Calories = @Calories,
                            Carbs = @Carbs,
                            Fats = @Fats,
                            Protein = @Protein,
                            Fiber = @Fiber,
                            Sugar = @Sugar,
                            Sodium = @Sodium
                        OUTPUT INSERTED. *
                        WHERE UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    updatedGoal.UserId,
                    updatedGoal.Calories,
                    updatedGoal.Carbs,
                    updatedGoal.Fats,
                    updatedGoal.Protein,
                    updatedGoal.Fiber,
                    updatedGoal.Sugar,
                    updatedGoal.Sodium,
                };

                var result = db.QueryFirstOrDefault<DailyGoal>(sql, parameters);
                return result;
            }
        }
        
    }
}
