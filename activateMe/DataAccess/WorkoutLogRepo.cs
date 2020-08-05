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
    public class WorkoutLogRepo
    {
        string ConnectionString;

        public WorkoutLogRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<WorkoutLog> GetAllLogs()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<WorkoutLog>("select * from WorkoutLog");
            }
        }

        public IEnumerable<WorkoutLog>  GetUserLogsById(int uid)
        {
            var sql = @"select * 
                        from WorkoutLog
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.Query<WorkoutLog>(sql, parameters);

            }
        }

        public string DeleteWorkoutLog(int id)
        {
            var sql = @"delete 
                        from WorkoutLog
                        where id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { id = id });
                return ($"You successfully deleted an exercise from your log.");
            }
        }

        public WorkoutLog AddWorkoutLog(WorkoutLog exerciseToAdd)
        {
            var sql = @"insert into WorkoutLog(Name, WorkoutTypeId, Time, Calories, Points, UserId)
                        output inserted. *
                        values(@Name, @WorkoutTypeId, @Time, @Calories, @Points, @UserId )";

            var multiplierQuery = @"select PointMultiplier
                                    from WorkoutType
                                    where id = @WorkoutTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var multiplier = db.QueryFirstOrDefault<int>(multiplierQuery, new { WorkoutTypeId = exerciseToAdd.WorkoutTypeId });
                var points = exerciseToAdd.Time * multiplier;
                var parameters = new
                {
                    exerciseToAdd.Name,
                    exerciseToAdd.WorkoutTypeId,
                    exerciseToAdd.Time,
                    exerciseToAdd.Calories,
                    exerciseToAdd.UserId,
                    points = points
                };
                var result = db.QueryFirstOrDefault<WorkoutLog>(sql, parameters);
                return result;
            }
        }


        public int? GetAllCaloriesFromWorkouts(int uid)
        {
            var sql = @"select SUM(calories) as Calories
                        from WorkoutLog
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.QueryFirstOrDefault<int?>(sql, parameters);

            }
        }

        public int? GetWorkoutPoints(int id)
        {
            var sql = @"select SUM(points) as points
                        from WorkoutLog
                        where userId = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                return db.QueryFirstOrDefault<int?>(sql, parameters);
            }
        }
    }
}
