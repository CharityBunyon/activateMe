﻿using System;
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
    public class FoodLogController: ControllerBase
    {
        FoodLogRepo _repository;

        public FoodLogController(FoodLogRepo repository)
        {
            _repository = repository;
        }


        [HttpGet("foodLogs")]
        public IActionResult GetFoodLogs()
        {
            var allFoods = _repository.GetAllLogs();

            return Ok(allFoods);
        }

        [HttpGet("foodLogs/{userId}")]
        public IActionResult GetUserFoodLogs(int userId)
        {
            var foodLogs = _repository.GetUserLogsById(userId);
            if (foodLogs == null)
            {
                return NotFound("Sorry, this user does have any food logs.");
            }

            return Ok(foodLogs);
        }

        [HttpDelete("removeFoodLog/{id}")]

        public IActionResult RemoveFoodLog(int id)
        {
            var removeFood = _repository.DeleteLog(id);
            return Ok(removeFood);
        }


        [HttpPost("foodToAdd")]
        public IActionResult AddFood(FoodLog foodToAdd)
        {
            var newFoodLog = _repository.AddFoodLog(foodToAdd);
            return Created("", newFoodLog);
        }

        //[HttpPut("UpdateFood")]
        //public IActionResult UpdateFood(int id, FoodLog updatedFoodLog)
        //{
        //    var updatedFood = _repository.UpdateFoodLog(id, updatedFoodLog);
        //    return Ok(updatedFoodLog);
        //}


        [HttpGet("calories/{id}")]

        public IActionResult GetCalories(int id)
        {
            var calories = _repository.GetAllFoodCaloriesForUser(id);

            return Ok(calories);
        }

        [HttpGet("points/{id}")]

        public IActionResult GetPoints(int id)
        {
            var points = _repository.GetUserPoints(id);

            return Ok(points);
        }

        [HttpGet("carbs/{id}")]

        public IActionResult GetCarbs(int id)
        {
            var carbs = _repository.GetAllCarbsUser(id);

            return Ok(carbs);
        }

        [HttpGet("fats/{id}")]

        public IActionResult GetFats(int id)
        {
            var fats = _repository.GetAllFatsUser(id);

            return Ok(fats);
        }

        [HttpGet("protein/{id}")]

        public IActionResult GetProtein(int id)
        {
            var protein = _repository.GetAllProteinUser(id);

            return Ok(protein);
        }
    }
}
