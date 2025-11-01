using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UnifiedAPI.Data;
using UnifiedAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { 
        Title = "Unified Assignment API", 
        Version = "v1",
        Description = "Combined API for all three assignments: Task Manager, Project Manager, and Smart Scheduler"
    });
});

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000", 
                "http://localhost:5173",
                "https://testingribhav.pecfest.in")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Database Context (for Assignment 2)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("AssignmentDb"));

// Services
builder.Services.AddSingleton<TaskStorageService>(); // Assignment 1
builder.Services.AddScoped<IAuthService, AuthService>(); // Assignment 2
builder.Services.AddScoped<IProjectService, ProjectService>(); // Assignment 2
builder.Services.AddScoped<ITaskService, TaskService>(); // Assignment 2
builder.Services.AddScoped<EmailService>(); // OTP Email Service
builder.Services.AddScoped<ITokenService, TokenService>(); // Token Service for OTP
builder.Services.AddSingleton<ISchedulerService, SchedulerService>(); // Assignment 3

// JWT Configuration (for Assignment 2)
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "your-super-secret-key-min-32-characters-long-for-security";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "UnifiedAPI";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "UnifiedAPIUsers";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Unified Assignment API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Welcome endpoint
app.MapGet("/", () => new
{
    message = "Unified Assignment API",
    version = "1.0.0",
    assignments = new[]
    {
        new { id = 1, name = "Task Manager", baseUrl = "/api/assignment1", credits = 10 },
        new { id = 2, name = "Project Manager", baseUrl = "/api/assignment2", credits = 20 },
        new { id = 3, name = "Smart Scheduler", baseUrl = "/api/assignment3", credits = 10 }
    },
    swagger = "/swagger",
    timestamp = DateTime.UtcNow
});

app.Run();
