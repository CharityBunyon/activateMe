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
                        Insert into [User](firstname, lastname, dateJoined, userName, Email, city, state, imageUrl)
                        Output Inserted. *
                        Values(@firstname, @lastname, GETDATE(), @username, @Email, 'Awesome Sauce', 'TN', 'https://lh3.googleusercontent.com/proxy/qPtLqvLNJ0zSKLNwSXdumND5edL_-y9ZVDpCaC_wMHuea9v43NbJ2FnAqNKaWdhCKHPSgy5Czw01Gcj3-sW-b8OIAOn18AC1XTMdxhpO108uOG1_1gOIcjFbK8CDo2VcOwtZYOFUK_c')";

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
                            userName = @username,
                            email = @email,
                            city = @city,
                            state = @state,
                            imageUrl = @imageUrl
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
