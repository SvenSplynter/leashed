using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Sven",
                    Email = "sven@test.com",
                    UserName = "sven@test.com",
                    Address = new Address
                    {
                        FirstName = "Sven",
                        LastName = "Joseph",
                        Street = "Tieltse Baan 50",
                        City = "Aarschot",
                        ZipCode = "3200"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}