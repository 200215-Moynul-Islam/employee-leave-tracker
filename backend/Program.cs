var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(); // Enable controllers

var app = builder.Build();

app.MapControllers(); // Map API endpoints

app.Run();
