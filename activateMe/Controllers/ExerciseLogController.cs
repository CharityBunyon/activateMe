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
    public class ExerciseLogController: ControllerBase
    {
        ExerciseLogRepo _repository;

        public ExerciseLogController(ExerciseLogRepo repository)
        {
            _repository = repository;
        }


        [HttpGet("exerciseLogs")]
        public IActionResult GetExerciseLogs()
        {
            var allExercises = _repository.GetAllLogs();

            return Ok(allExercises);
        }

        [HttpGet("exerciseLogs/{uid}")]
        public IActionResult GetExerciseLogs(int uid)
        {
            var exerciseLogs = _repository.GetUserLogsById(uid);
            if (exerciseLogs == null)
            {
                return NotFound("Sorry, this user does not have any exercise logs");
            }

            return Ok(exerciseLogs);
        }

        [HttpDelete("removeExerciseLog/{id}")]

        public IActionResult RemoveFoodLog(int id)
        {
            var removeExercise = _repository.DeleteExerciseLog(id);
            return Ok(removeExercise);
        }


        [HttpPost("exerciseToAdd")]
        public IActionResult AddExercise(ExerciseLog exerciseToAdd)
        {
            var newExerciseLog = _repository.AddExerciseLog(exerciseToAdd);
            return Created("", newExerciseLog);
        }

        [HttpGet("exerciseCalories/{id}")]

        public IActionResult GetCalories(int id)
        {
            var calories = _repository.GetAllCaloriesFromExercise(id);

            return Ok(calories);
        }


    }
}
