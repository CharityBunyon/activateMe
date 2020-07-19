using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using activateMe.Models;
using System.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;
using Dapper;

namespace activateMe.DataAccess
{
    public class UserRepo
    {
        string ConnectionString;

        public UserRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("ActivateMe");
        }

        public IEnumerable<User> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<User>("Select * From [User]");
            }
        }

        
        public User GetUserById(int id)
        {
            var sql = @"Select *
                      From[User]
                      Where Id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var user = db.QueryFirstOrDefault<User>(sql, new {Id = id});

                return user;
            }
        }

        public User GetUserByUsername(string username)
        {
            var sql = @"Select *
                      From [User]
                      Where UserName = @username";

            using (var db = new SqlConnection(ConnectionString))
            {
                var user = db.QueryFirstOrDefault<User>(sql, new {Username = username});

                return user;
            }
        }


        public User AddUser(User userToAdd)
        {
            var sql = @"
                        Insert into [User](firstname, lastname, dateJoined, userName, Email, city, state, imageUrl, points)
                        Output Inserted. *
                        Values(@firstname, @lastname, GETDATE(), @username, @Email, @city, @state, @imageUrl, 0)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<User>(sql, userToAdd);

                return result;
            }
        }

        public User UpdateUser(User updatedUser)
        {
            var sql = @"Update [User]
                        SET firstname = @firstname, 
                            lastname = @lastname,
                            dateJoined = GETDATE(),
                            userName = @username,
                            email = @email,
                            city = @city,
                            state = @state,
                            imageUrl = @imageUrl,
                            points = @points
                        OUTPUT INSERTED. *
                        WHERE Id = @id";
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    updatedUser.Id,
                    updatedUser.Firstname,
                    updatedUser.Lastname,
                    updatedUser.UserName,
                    updatedUser.DateJoined,
                    updatedUser.Email,
                    updatedUser.City,
                    updatedUser.State,
                    updatedUser.ImageUrl,
                    updatedUser.Points,
                };

                var result = db.QueryFirstOrDefault<User>(sql, parameters);

                return result;
            }

        }
    }
}
