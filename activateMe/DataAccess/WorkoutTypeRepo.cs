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
    public class WorkoutTypeRepo
    {
        string ConnectionString;

        public WorkoutTypeRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<WorkoutType> GetWorkouts()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<WorkoutType>("select * from WorkoutType");
            }
        }
    }
}
