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
    public class ExerciseCategoryController : ControllerBase
    {
        ExerciseCategoryRepo _repository;

        public ExerciseCategoryController(ExerciseCategoryRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("exerciseCategory")]
        public IActionResult GetExerciseCategories()
        {
            var allExerciseCategories = _repository.GetExerciseCategories();
            return Ok(allExerciseCategories);
        }
    }
}
