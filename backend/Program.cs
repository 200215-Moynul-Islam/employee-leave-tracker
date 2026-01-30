using ELTBackend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#region Services
// Register controllers
builder.Services.AddControllers();

// Register DbContext with SQL Server
builder.Services.AddDbContext<EmployeeLeaveTrackerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
#endregion

var app = builder.Build();

app.MapControllers(); // Map API endpoints

app.Run();
