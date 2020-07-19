using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using activateMe.DataAccess;
using activateMe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace activateMe.Controllers
{
    [Route("api/activateMe")]
    [ApiController]
    public class SampleRecipeController: ControllerBase
    {
        SampleRecipeRepo _repository;

        public SampleRecipeController(SampleRecipeRepo repository)
        {
            _repository = repository;
        }

        //api/user
        [HttpGet("recipes")]
        public IActionResult GetAllRecipes()
        {
            var allrecipes = _repository.GetAll();

            return Ok(allrecipes);
        }

    }
}
