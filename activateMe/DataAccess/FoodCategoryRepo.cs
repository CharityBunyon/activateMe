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
    public class FoodCategoryRepo
    {
        string ConnectionString;

        public FoodCategoryRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<FoodCategory> GetFoodCategories()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<FoodCategory>("select * from foodCategory");
            }
        }
    }
}
