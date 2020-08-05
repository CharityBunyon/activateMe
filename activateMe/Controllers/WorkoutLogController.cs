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
    public class WorkoutLogController: ControllerBase
    {
        WorkoutLogRepo _repository;

        public WorkoutLogController(WorkoutLogRepo repository)
        {
            _repository = repository;
        }


        [HttpGet("workoutLogs")]
        public IActionResult GetWorkoutLogs()
        {
            var allWorkouts = _repository.GetAllLogs();

            return Ok(allWorkouts);
        }

        [HttpGet("workoutLogs/{uid}")]
        public IActionResult GetWorkoutLogsById(int uid)
        {
            var workoutLogs = _repository.GetUserLogsById(uid);
            if (workoutLogs == null)
            {
                return NotFound("Sorry, this user does not have any exercise logs");
            }

            return Ok(workoutLogs);
        }

        [HttpDelete("removeWorkoutLog/{id}")]

        public IActionResult RemoveFoodLog(int id)
        {
            var removeWorkout = _repository.DeleteWorkoutLog(id);
            return Ok(removeWorkout);
        }


        [HttpPost("workoutToAdd")]
        public IActionResult AddExercise(WorkoutLog workoutToAdd)
        {
            var newWorkoutLog = _repository.AddWorkoutLog(workoutToAdd);
            return Created("", newWorkoutLog);
        }

        [HttpGet("workoutCalories/{id}")]

        public IActionResult GetCalories(int id)
        {
            var calories = _repository.GetAllCaloriesFromWorkouts(id);

            return Ok(calories);
        }

        [HttpGet("workoutPoints/{id}")]

        public IActionResult GetExercisePoints(int id)
        {
            var points = _repository.GetWorkoutPoints(id);

            return Ok(points);
        }

    }
}
