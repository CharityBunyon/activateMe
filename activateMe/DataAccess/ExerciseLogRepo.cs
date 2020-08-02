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
    public class ExerciseLogRepo
    {
        string ConnectionString;

        public ExerciseLogRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<ExerciseLog> GetAllLogs()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<ExerciseLog>("select * from Exercise");
            }
        }

        public IEnumerable<ExerciseLog>  GetUserLogsById(int uid)
        {
            var sql = @"select * 
                        from Exercise
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.Query<ExerciseLog>(sql, parameters);

            }
        }

        public string DeleteExerciseLog(int id)
        {
            var sql = @"delete 
                        from Exercise
                        where id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { id = id });
                return ($"You successfully deleted an exercise from your log.");
            }
        }

        public ExerciseLog AddExerciseLog(ExerciseLog exerciseToAdd)
        {
            var sql = @"insert into Exercise(name, categoryTypeId, time, calories, points, userId)
                        output inserted. *
                        values(@name, @categoryTypeId, @time, @calories, @points, @userId )";

            var multiplierQuery = @"select pointMultiplier
                                    from ExerciseCategory
                                    where id = @categoryTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var multiplier = db.QueryFirstOrDefault<int>(multiplierQuery, new { CategoryTypeId = exerciseToAdd.CategoryTypeId });
                var points = exerciseToAdd.Time * multiplier;
                var parameters = new
                {
                    exerciseToAdd.Name,
                    exerciseToAdd.CategoryTypeId,
                    exerciseToAdd.Time,
                    exerciseToAdd.Calories,
                    exerciseToAdd.UserId,
                    points = points
                };
                var result = db.QueryFirstOrDefault<ExerciseLog>(sql, parameters);
                return result;
            }
        }


        public int? GetAllCaloriesFromExercise(int uid)
        {
            var sql = @"select SUM(calories) as Calories
                        from Exercise
                        where userId = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Uid = uid };
                return db.QueryFirstOrDefault<int?>(sql, parameters);

            }
        }

        public int? GetExercisePoints(int id)
        {
            var sql = @"select SUM(points) as points
                        from Exercise
                        where userId = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                return db.QueryFirstOrDefault<int?>(sql, parameters);
            }
        }
    }
}
