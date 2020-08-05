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
    public class FoodTypeController: ControllerBase
    {
        FoodTypeRepo _repository;

        public FoodTypeController(FoodTypeRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("foodCategory")]
        public IActionResult GetFoodTypes()
        {
            var allFoodTypes = _repository.GetFoodTypes();
            return Ok(allFoodTypes);
        }
    }
}
