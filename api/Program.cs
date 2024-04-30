using System.Reflection;
using api.State;
using Fleck;
using infrastructure;
using infrastructure.Repositories;
using lib;
using Npgsql;
using service.Services;


namespace api;

public static class Startup
{
    public static void Main(string[] args)
    {
        Statup(args);
        Console.ReadLine();
    }

    public static void Statup(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddNpgsqlDataSource(Utilities.ProperlyFormattedConnectionString,
                dataSourceBuilder => dataSourceBuilder.EnableParameterLogging());
        }

        if (builder.Environment.IsProduction())
        {
            builder.Services.AddNpgsqlDataSource(Utilities.ProperlyFormattedConnectionString);
        }
        
        builder.Services.AddSingleton<AccountService>();
        builder.Services.AddSingleton<UserRepository>();
        builder.Services.AddSingleton<PasswordHashRepository>();

        var clientEventHandlers = builder.FindAndInjectClientEventHandlers(Assembly.GetExecutingAssembly());

        var app = builder.Build();

        var post = Environment.GetEnvironmentVariable("POST") ?? "8181";
        var server = new WebSocketServer("ws://0.0.0.0:8181" + post);
        
        app.UseCors(options =>

        {

            options.SetIsOriginAllowed(origin => true)

                .AllowAnyMethod()

                .AllowAnyHeader()

                .AllowCredentials();

        });

        server.Start(ws =>
        {
            ws.OnOpen = () =>
            {
                WebSocketStateService.AddConnection(ws);
            };
            ws.OnMessage = async message =>
            {
                // evaluate whether or not message.eventType == 
                // trigger event handler
                try
                {
                    await app.InvokeClientEventHandler(clientEventHandlers, ws, message);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    Console.WriteLine(e.InnerException);
                    Console.WriteLine(e.StackTrace);
                    // your exception handling here
                }
            };
        });
    }
}