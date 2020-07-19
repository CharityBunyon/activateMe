using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using activateMe.DataAccess;
using activateMe.Models;
using Microsoft.AspNetCore.Mvc;

namespace activateMe.Controllers
{
    [Route("api/activateMe")]
    [ApiController]
    public class FoodCategoryController: ControllerBase
    {
        FoodCategoryRepo _repository;

        public FoodCategoryController(FoodCategoryRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("foodCategory")]
        public IActionResult GetFoodCategories()
        {
            var allFoodCategories = _repository.GetFoodCategories();
            return Ok(allFoodCategories);
        }
    }
}
