﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using activateMe.Models;
using System.Data.SqlClient;
using Dapper;

namespace activateMe.DataAccess
{
    public class WorkoutRepo
    {
        string ConnectionString;

        public WorkoutRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<Workout> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Workout>("Select * From Workout");
            }
        }

        //public SampleExercises AddExerciseToDashboard(SampleExercises exerciseToAdd)
        //{
        //    var sql = @"
        //                insert into [User]
        //                values(1)
        //                select [user].sampleRecipeId
        //                from [User]
        //                join SampleRecipes on SampleRecipes.id = [user].sampleRecipeId
        //                where [user].ID = 1";

        //    using (var db = new SqlConnection(ConnectionString))
        //    {
        //        var result = db.QueryFirstOrDefault<SampleExercises>(sql, exerciseToAdd);

        //        return result;
        //    }
        //}
    }
}
