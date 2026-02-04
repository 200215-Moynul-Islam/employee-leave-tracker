using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangePassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9e6d8c7b-4a4a-4f1e-9a3f-8f6c4c2b1a9d"),
                column: "PasswordHash",
                value: "$2a$11$PPDEDA5XLmss8nSmo6Je8O34gVQH6Tuza/nNEIKC8cIca0bSFGQUG");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9e6d8c7b-4a4a-4f1e-9a3f-8f6c4c2b1a9d"),
                column: "PasswordHash",
                value: "$2a$11$681X.KzBbj.2OPEJj.PR0.maiqA7cHEsYDaEAu4bu2/clD36GI13a");
        }
    }
}
