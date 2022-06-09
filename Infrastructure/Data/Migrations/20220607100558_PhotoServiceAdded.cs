using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    public partial class PhotoServiceAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    MainColor = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    PictureUrl = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HardwareColors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HardwareColors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HardwareMaterials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HardwareMaterials", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HardwareTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HardwareTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaterialTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Abbreviation = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hardwares",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    HardwareTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Size = table.Column<int>(type: "INTEGER", nullable: false),
                    HardwareMaterialId = table.Column<int>(type: "INTEGER", nullable: false),
                    HardwareColorId = table.Column<int>(type: "INTEGER", nullable: false),
                    InStock = table.Column<int>(type: "INTEGER", nullable: false),
                    Ordered = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<double>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hardwares", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hardwares_HardwareColors_HardwareColorId",
                        column: x => x.HardwareColorId,
                        principalTable: "HardwareColors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Hardwares_HardwareMaterials_HardwareMaterialId",
                        column: x => x.HardwareMaterialId,
                        principalTable: "HardwareMaterials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Hardwares_HardwareTypes_HardwareTypeId",
                        column: x => x.HardwareTypeId,
                        principalTable: "HardwareTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    MaterialTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Thickness = table.Column<int>(type: "INTEGER", nullable: false),
                    ColorId = table.Column<int>(type: "INTEGER", nullable: false),
                    PricePerMeter = table.Column<double>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Materials_Colors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Materials_MaterialTypes_MaterialTypeId",
                        column: x => x.MaterialTypeId,
                        principalTable: "MaterialTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ProductTypeId = table.Column<int>(type: "INTEGER", maxLength: 100, nullable: false),
                    Length = table.Column<double>(type: "decimal(18,2)", nullable: false),
                    MaterialId = table.Column<int>(type: "INTEGER", nullable: false),
                    Finishing = table.Column<string>(type: "TEXT", nullable: true),
                    FinishMaterial1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    FinishMaterial2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    FinishMaterial3Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Hook1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Hook2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    ORing1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    ORing2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    StopBarId = table.Column<int>(type: "INTEGER", nullable: false),
                    KeychainId = table.Column<int>(type: "INTEGER", nullable: false),
                    EndCapsId = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<double>(type: "decimal(18,2)", nullable: false),
                    InStock = table.Column<int>(type: "INTEGER", nullable: false),
                    LastUpdated = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Hardwares_EndCapsId",
                        column: x => x.EndCapsId,
                        principalTable: "Hardwares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Hardwares_Hook1Id",
                        column: x => x.Hook1Id,
                        principalTable: "Hardwares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Hardwares_Hook2Id",
                        column: x => x.Hook2Id,
                        principalTable: "Hardwares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Hardwares_KeychainId",
                        column: x => x.KeychainId,
                        principalTable: "Hardwares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Hardwares_ORing1Id",
                        column: x => x.ORing1Id,
                        principalTable: "Hardwares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Hardwares_ORing2Id",
                        column: x => x.ORing2Id,
                        principalTable: "Hardwares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Hardwares_StopBarId",
                        column: x => x.StopBarId,
                        principalTable: "Hardwares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Materials_FinishMaterial1Id",
                        column: x => x.FinishMaterial1Id,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Materials_FinishMaterial2Id",
                        column: x => x.FinishMaterial2Id,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Materials_FinishMaterial3Id",
                        column: x => x.FinishMaterial3Id,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_ProductTypes_ProductTypeId",
                        column: x => x.ProductTypeId,
                        principalTable: "ProductTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StockMaterials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    MaterialId = table.Column<int>(type: "INTEGER", nullable: false),
                    MeterInStock = table.Column<double>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockMaterials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StockMaterials_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PictureUrl = table.Column<string>(type: "TEXT", nullable: true),
                    FileName = table.Column<string>(type: "TEXT", nullable: true),
                    IsMain = table.Column<bool>(type: "INTEGER", nullable: false),
                    ProductId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photo_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hardwares_HardwareColorId",
                table: "Hardwares",
                column: "HardwareColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Hardwares_HardwareMaterialId",
                table: "Hardwares",
                column: "HardwareMaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_Hardwares_HardwareTypeId",
                table: "Hardwares",
                column: "HardwareTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Materials_ColorId",
                table: "Materials",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Materials_MaterialTypeId",
                table: "Materials",
                column: "MaterialTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductId",
                table: "Photo",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_EndCapsId",
                table: "Products",
                column: "EndCapsId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_FinishMaterial1Id",
                table: "Products",
                column: "FinishMaterial1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_FinishMaterial2Id",
                table: "Products",
                column: "FinishMaterial2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_FinishMaterial3Id",
                table: "Products",
                column: "FinishMaterial3Id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Hook1Id",
                table: "Products",
                column: "Hook1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Hook2Id",
                table: "Products",
                column: "Hook2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_KeychainId",
                table: "Products",
                column: "KeychainId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_MaterialId",
                table: "Products",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ORing1Id",
                table: "Products",
                column: "ORing1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ORing2Id",
                table: "Products",
                column: "ORing2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductTypeId",
                table: "Products",
                column: "ProductTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_StopBarId",
                table: "Products",
                column: "StopBarId");

            migrationBuilder.CreateIndex(
                name: "IX_StockMaterials_MaterialId",
                table: "StockMaterials",
                column: "MaterialId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photo");

            migrationBuilder.DropTable(
                name: "StockMaterials");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Hardwares");

            migrationBuilder.DropTable(
                name: "Materials");

            migrationBuilder.DropTable(
                name: "ProductTypes");

            migrationBuilder.DropTable(
                name: "HardwareColors");

            migrationBuilder.DropTable(
                name: "HardwareMaterials");

            migrationBuilder.DropTable(
                name: "HardwareTypes");

            migrationBuilder.DropTable(
                name: "Colors");

            migrationBuilder.DropTable(
                name: "MaterialTypes");
        }
    }
}
