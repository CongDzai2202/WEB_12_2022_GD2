using Microsoft.AspNetCore.Mvc;
using MISA.AMIS.BL.BaseBL;
using MISA.AMIS.BL;
using MISA.AMIS.DL.BaseDL;
using MISA.AMIS.DL.Datacontext;
using MISA.AMIS.DL.EmployeeDL;
using MISA.AMIS.Common.Entities;
using MISA.AMIS.DL.RestDetailDL;
using MISA.AMIS.BL.RestDetailBL;
using MISA.AMIS.BL.RestTableBL;
using MISA.AMIS.DL.RestTableDL;

var builder = WebApplication.CreateBuilder(args);

DataBaseContext.connectionString = builder.Configuration.GetConnectionString("MySql");
// Add services to the container.

builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = null;
        }
        );

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("corspolicy", build => //1
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

//Tắt validate mặc định
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddScoped(typeof(IBaseBL<>), typeof(BaseBL<>));
builder.Services.AddScoped(typeof(IBaseDL<>), typeof(BaseDL<>));

builder.Services.AddScoped<IEmployeeBL, EmployeeBL>();
builder.Services.AddScoped<IEmployeeDL, EmployeeDL>();

builder.Services.AddScoped<IRestDetailBL, RestDetailBL>();
builder.Services.AddScoped<IRestDetailDL, RestDetaiDL>();

builder.Services.AddScoped<IRestTableBL, RestTableBL>();
builder.Services.AddScoped<IRestTableDL, RestTableDL>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("corspolicy"); //2
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
