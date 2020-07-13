using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using activateMe.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data.SqlClient;

namespace activateMe.DataAccess
{
    public class UserRepo
    {
        string ConnectionString;

        public UserRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }
    }
}
