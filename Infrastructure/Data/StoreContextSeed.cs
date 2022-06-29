using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;
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
                        var pictureFileName = item.PictureUrl;
                        var color = new Color
                        {
                            Name = item.Name,
                            MainColor = item.MainColor,
                        };
                        color.AddPhoto(item.PictureUrl, pictureFileName);
                        context.Colors.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.HardwareTypes.Any())
                {
                    var hardwaretypesData = File.ReadAllText("../Infrastructure/Data/SeedData/hardwaretypes.json");

                    var hardwaretypes = JsonSerializer.Deserialize<List<HardwareType>>(hardwaretypesData);

                    foreach (var item in hardwaretypes)
                    {
                        context.HardwareTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.HardwareMaterials.Any())
                {
                    var hardwareMaterialsData = File.ReadAllText("../Infrastructure/Data/SeedData/hardwarematerials.json");

                    var hardwareMaterials = JsonSerializer.Deserialize<List<HardwareMaterial>>(hardwareMaterialsData);

                    foreach (var item in hardwareMaterials)
                    {
                        context.HardwareMaterials.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.HardwareColors.Any())
                {
                    var hardwareColorsData = File.ReadAllText("../Infrastructure/Data/SeedData/hardwarecolors.json");

                    var hardwareColors = JsonSerializer.Deserialize<List<HardwareColor>>(hardwareColorsData);

                    foreach (var item in hardwareColors)
                    {
                        context.HardwareColors.Add(item);
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

                if (!context.MaterialTypes.Any())
                {
                    var materialTypesData = File.ReadAllText("../Infrastructure/Data/SeedData/materialtypes.json");

                    var materialTypes = JsonSerializer.Deserialize<List<MaterialType>>(materialTypesData);

                    foreach (var item in materialTypes)
                    {
                        context.MaterialTypes.Add(item);
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

                if (!context.ProductTypes.Any())
                {
                    var productTypesData = File.ReadAllText("../Infrastructure/Data/SeedData/producttypes.json");

                    var productTypes = JsonSerializer.Deserialize<List<ProductType>>(productTypesData);

                    foreach (var item in productTypes)
                    {
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<ProductSeedModel>>(productsData);

                    foreach (var item in products)
                    {
                        var pictureFileName = item.PictureUrl.Substring(16);
                        var product = new Product
                        {
                            Name = item.Name,
                            PublicName = item.PublicName,
                            ProductTypeId = item.ProductTypeId,
                            Length = item.Length,
                            MaterialId = item.MaterialId,
                            Finishing = item.Finishing,
                            FinishMaterial1Id = item.FinishMaterial1Id,
                            FinishMaterial2Id = item.FinishMaterial2Id,
                            FinishMaterial3Id = item.FinishMaterial3Id,
                            Hook1Id = item.Hook1Id,
                            Hook2Id = item.Hook2Id,
                            ORing1Id = item.ORing1Id,
                            ORing2Id = item.ORing2Id,
                            StopBarId = item.StopBarId,
                            KeychainId = item.KeychainId,
                            EndCapsId = item.EndCapsId,
                            Price = item.Price,
                            InStock = item.InStock,
                            Description = item.Description,
                            LastUpdated = item.LastUpdated
                        };
                        product.AddPhoto(item.PictureUrl, pictureFileName);
                        context.Products.Add(product);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    var dmData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");

                    var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                    foreach (var item in deliveryMethods)
                    {
                        context.DeliveryMethods.Add(item);
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