using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using activateMe.DataAccess;
using activateMe.Models;

namespace activateMe.Controllers
{
    [Route("api/activateMe")]
    [ApiController]
    public class BadgeController: ControllerBase
    {
        BadgeRepo _repository;

        public BadgeController(BadgeRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("badges")]
        public IActionResult GetBadges()
        {
            var allBadges = _repository.GetAllBadges();
            return Ok(allBadges);
        }

        [HttpGet("badges/{id}")]
        public IActionResult GetEarnedBadges(int id)
        {
            var badges = _repository.RevealBadges(id);
            if (badges == null)
            {
                return NotFound("Start Logging To Earn Badges");
            }

            return Ok(badges);
        }

    }
}
