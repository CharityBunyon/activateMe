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
    public class FoodTypeRepo
    {
        string ConnectionString;

        public FoodTypeRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<FoodType> GetFoodTypes()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<FoodType>("select * from FoodType");
            }
        }
    }
}
