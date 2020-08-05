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
    public class WorkoutTypeController : ControllerBase
    {
        WorkoutTypeRepo _repository;

        public WorkoutTypeController(WorkoutTypeRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("workoutType")]
        public IActionResult GetExerciseCategories()
        {
            var allWorkouts = _repository.GetWorkouts();
            return Ok(allWorkouts);
        }
    }
}
