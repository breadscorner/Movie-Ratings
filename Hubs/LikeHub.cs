namespace movies.Hubs;
using Microsoft.AspNetCore.SignalR;

public class LikeHub : Hub
{
  public override Task OnConnectedAsync()
  {
    Console.WriteLine("A Client Connected: " + Context.ConnectionId);
    return base.OnConnectedAsync();
  }

  public override Task OnDisconnectedAsync(Exception exception)
  {
    Console.WriteLine("A client disconnected: " + Context.ConnectionId);
    return base.OnDisconnectedAsync(exception);
  }

  public async Task SendLike(string like)
  {
      Console.WriteLine($"Received like: {like}");
      await Clients.All.SendAsync("Receivelike", like);
  }

}