using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using activateMe.DataAccess;
using activateMe.Models;
using Microsoft.AspNetCore.Mvc;

namespace activateMe.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController
    {
        UserRepo _repository;

        public UserController(UserRepo repository)
        {
            _repository = repository;
        }

    }
}
