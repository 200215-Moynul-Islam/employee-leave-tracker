using ELTBackend.Data;
using ELTBackend.Mappings;
using ELTBackend.Repositories;
using ELTBackend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#region Services
// Register controllers
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddControllers();

// Register DbContext with SQL Server
builder.Services.AddDbContext<EmployeeLeaveTrackerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Regsiter swagger for API documentation
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

// Register all the service classes
builder.Services.AddScoped<IUserService, UserService>();

// Register all the repository classes
builder.Services.AddScoped<IUserRepository, UserRepository>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
#region Middlewares
// Enable Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
#endregion

app.MapControllers();

app.Run();
