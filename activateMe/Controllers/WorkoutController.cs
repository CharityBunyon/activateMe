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
    public class WorkoutController: ControllerBase
    {
        WorkoutRepo _repository;

        public WorkoutController(WorkoutRepo repository)
        {
            _repository = repository;
        }

        //api/user
        [HttpGet("workouts")]
        public IActionResult GetAllExercises()
        {
            var allWorkouts = _repository.GetAll();

            return Ok(allWorkouts);
        }
    }
}
