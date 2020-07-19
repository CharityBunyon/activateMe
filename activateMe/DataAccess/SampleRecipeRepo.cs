using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using activateMe.Models;
using System.Data.SqlClient;
using Dapper;

namespace activateMe.DataAccess
{
    public class SampleRecipeRepo
    {
        string ConnectionString;

        public SampleRecipeRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<SampleRecipes> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<SampleRecipes>("Select * From SampleRecipes");
            }
        }

        public SampleRecipes AddRecipeToDashboard(SampleRecipes recipeToAdd)
        {
            var sql = @"
                        insert into [User]
                        values(1)
                        select [user].sampleRecipeId
                        from [User]
                        join SampleRecipes on SampleRecipes.id = [user].sampleRecipeId
                        where [user].ID = 1";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<SampleRecipes>(sql, recipeToAdd);

                return result;
            }
        }
    }
}
