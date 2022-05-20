using System.Text.Json;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Colors.Any())
                {
                    var colorsData = File.ReadAllText("../Infrastructure/Data/SeedData/colors.json");

                    var colors = JsonSerializer.Deserialize<List<Color>>(colorsData);

                    foreach (var item in colors)
                    {
                        context.Colors.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Hardwares.Any())
                {
                    var hardwaresData = File.ReadAllText("../Infrastructure/Data/SeedData/hardwares.json");

                    var hardwares = JsonSerializer.Deserialize<List<Hardware>>(hardwaresData);

                    foreach (var item in hardwares)
                    {
                        context.Hardwares.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Materials.Any())
                {
                    var materialsData = File.ReadAllText("../Infrastructure/Data/SeedData/materials.json");

                    var materials = JsonSerializer.Deserialize<List<Material>>(materialsData);

                    foreach (var item in materials)
                    {
                        context.Materials.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.StockMaterials.Any())
                {
                    var stockMaterialsData = File.ReadAllText("../Infrastructure/Data/SeedData/stockmaterials.json");

                    var stockMaterials = JsonSerializer.Deserialize<List<StockMaterial>>(stockMaterialsData);

                    foreach (var item in stockMaterials)
                    {
                        context.StockMaterials.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}