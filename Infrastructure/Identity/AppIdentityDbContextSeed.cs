using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
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
                    },
                                        new AppUser
                    {
                        DisplayName = "Lisa",
                        Email = "lisa@splynter.eu",
                        UserName = "lisa@splynter.eu"
                    }
                };

                var roles = new List<AppRole>
                {
                    new AppRole {Name = "Admin"},
                    new AppRole {Name = "Member"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");
                    if (user.Email == "lisa@splynter.eu") await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}