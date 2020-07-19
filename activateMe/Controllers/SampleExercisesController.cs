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
    public class SampleExercisesController: ControllerBase
    {
        SampleExercisesRepo _repository;

        public SampleExercisesController(SampleExercisesRepo repository)
        {
            _repository = repository;
        }

        //api/user
        [HttpGet("exercises")]
        public IActionResult GetAllExercises()
        {
            var allExercises = _repository.GetAll();

            return Ok(allExercises);
        }
    }
}
