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
    public class UserController: ControllerBase
    {
        UserRepo _repository;

        public UserController(UserRepo repository)
        {
            _repository = repository;
        }

        //api/user
        [HttpGet("allUsers")]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repository.GetAll();

            return Ok(allUsers);
        }

        //Get user by Id
        [HttpGet("user/{id}")]
        public IActionResult GetUserById(int id)
        {
            var result = _repository.GetUserById(id);
            if (result == null)
            {
                return NotFound("Sorry, but this user does not exist.");
            }

            return Ok(result);
        }

        [HttpGet("userEmail/{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            var result = _repository.GetUserByEmail(email);
            if (result == null)
            {
                return NotFound("Sorry, but you don't have an account with us.");
            }

            return Ok(result);
        }

        //Add New User

        [HttpPost("addUser")]
        public IActionResult AddUser(User userToAdd)
        {
            var checkUsername = _repository.GetUserByUsername(userToAdd.UserName);
            if (checkUsername == null)
            {
                var result = _repository.AddUser(userToAdd);
                return Ok(result);
            }

            return Ok("You already have an account with us! Keep up the good work!");
        }

        // Update User Information
       [HttpPut("update")]
        public IActionResult UpdateUser(User updatedUser)
        {
            var existingUser = _repository.GetUserByEmail(updatedUser.Email);

            if (existingUser != null)
            {
                var updateUser = _repository.UpdateUser(updatedUser);
                return Ok(updateUser);

            }

            return NotFound("You already have an account with us! Keep up the good work!");
        }



    }
}
