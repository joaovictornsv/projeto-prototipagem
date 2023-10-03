using MongoDB.Driver;
using ProjetoPrototipagem.Data;
using ProjetoPrototipagem.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<DriverService>();
builder.Services.AddSingleton<LicensePlateService>();
builder.Services.AddSingleton<OwnerService>();


builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseConfig"));

builder.Services.AddSingleton<IMongoClient>(s =>
new MongoClient(builder.Configuration.GetValue<string>("DatabaseConfig:ConnectionString")));


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
