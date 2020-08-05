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


        public User GetUserByEmail(string email)
        {
            var sql = @"Select *
                        From [User]
                        Where Email = @email";

            using (var db = new SqlConnection(ConnectionString))
            {
                var user = db.QueryFirstOrDefault<User>(sql, new {Email = email});
                return user;
            }
        }


        public User AddUser(User userToAdd)
        {
            var sql = @"
                        Insert into [User](FirstName, LastName, DateJoined, Email, City, State, ImageUrl)
                        Output Inserted. *
                        Values(@Firstname, @Lastname, GETDATE(), @Email, 'Awesome Sauce', 'TN', 'https://raw.githubusercontent.com/CharityBunyon/activateMe/master/activateme.ui/src/assets/default-user-icon-4.jpg')";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<User>(sql, userToAdd);

                return result;
            }
        }

        public User UpdateUser(User updatedUser)
        {
            var sql = @"Update [User]
                        SET Firstname = @FirstName, 
                            Lastname = @LastName,
                            Email = @Email,
                            City = @City,
                            State = @State,
                            ImageUrl = @ImageUrl
                        OUTPUT INSERTED. *
                        WHERE Id = @id";
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    updatedUser.Id,
                    updatedUser.Firstname,
                    updatedUser.Lastname,
                    updatedUser.Email,
                    updatedUser.City,
                    updatedUser.State,
                    updatedUser.ImageUrl,
                };

                var result = db.QueryFirstOrDefault<User>(sql, parameters);

                return result;
            }

        }
    }
}
