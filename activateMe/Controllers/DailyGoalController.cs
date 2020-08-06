using System;
using System.Collections.Generic;
using System.Data.Common;
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
    public class DailyGoalController: ControllerBase
    {
        DailyGoalRepo _repository;
        public DailyGoalController(DailyGoalRepo repository)
        {
            _repository = repository;
        }

        //api/dailyGoals
        [HttpGet("dailyGoal")]
        public IActionResult GetAllGoals()
        {
            var allGoals = _repository.GetAll();

            return Ok(allGoals);
        }


        [HttpGet("dailyGoal/{userId}")]
        public IActionResult GetGoalById(int userId)
        {
            var result = _repository.GetGoalsById(userId);
            //if (result == null)
            //{
            //    return NotFound("Sorry, but this user doesn't have any daily goals.");
            //}

            return Ok(result);
        }

        [HttpPut("updateGoal")]
        public IActionResult UpdateDailyGoal(DailyGoal updatedGoal)
        {
            return Ok( _repository.UpdateGoal(updatedGoal));
            
        }
    }
}
