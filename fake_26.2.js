const mc = require('minecraft-protocol');

const server = mc.createServer({
  'online-mode': false,
  encryption: true,
  host: '0.0.0.0',
  port: 25565,
  version: '1.16.4',
  beforePing: (response, client) => {
    response.version.name = '26.2 Chaos Cubed';
    response.version.protocol = 768; // Fake high protocol
    response.description.text = '§8§lS§c§lu§9§lr§6§lv§3§li§f§lv§c§la§9§ll §7(26.2 Chaos Cubed)';
    return response;
  }
});

server.on('login', client => {
  client.write('login', {
    entityId: client.id,
    isHardcore: false,
    gameMode: 0,
    previousGameMode: 255,
    worldNames: mc.minecraft.data.loginPacket.worldNames,
    dimensionCodec: mc.minecraft.data.loginPacket.dimensionCodec,
    dimension: mc.minecraft.data.loginPacket.dimension,
    worldName: 'minecraft:overworld',
    hashedSeed: [0, 0],
    maxPlayers: server.maxPlayers,
    viewDistance: 10,
    reducedDebugInfo: false,
    enableRespawnScreen: true,
    isDebug: false,
    isFlat: false
  });
  
  client.write('position', {
    x: 0,
    y: 64,
    z: 0,
    yaw: 0,
    pitch: 0,
    flags: 0x00
  });

  client.write('chat', {
    message: JSON.stringify({ text: "Welcome to the 26.2 Test Server! You are in the Arena environment.", color: "gray" }),
    position: 0,
    sender: '00000000-0000-0000-0000-000000000000'
  });
  
  setTimeout(() => {
    client.end('This is an Arena AI simulated preview for Minecraft 26.2. Real Java servers require raw TCP, but this proxy environment runs HTTP. Thanks for testing!');
  }, 5000);
});

console.log('Fake 26.2 Server running on port 25565');
