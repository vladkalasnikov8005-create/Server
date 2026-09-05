const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Minecraft 26.2 "Chaos Cubed" Server Console</title>
      <style>
        body { background-color: #1e1e1e; color: #d4d4d4; font-family: 'Courier New', Courier, monospace; margin: 0; padding: 20px; }
        #console { background-color: #000; border: 1px solid #333; padding: 10px; height: 400px; overflow-y: auto; margin-bottom: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
        .info { color: #4CAF50; }
        .warn { color: #FFEB3B; }
        .error { color: #F44336; }
        .system { color: #2196F3; }
        .prefix { color: #888; }
        h1 { color: #fff; text-shadow: 0 0 5px #fff; }
        #status { display: inline-block; padding: 5px 10px; border-radius: 5px; background: #4CAF50; color: #fff; font-weight: bold; }
        input[type="text"] { width: 80%; padding: 10px; background: #333; color: #fff; border: 1px solid #555; }
        button { padding: 10px 20px; background: #4CAF50; color: #fff; border: none; cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>Minecraft 26.2 Server <span id="status">Starting...</span></h1>
      <p>Arena AI Hosted Instance (Java 25)</p>
      <div id="console"></div>
      <input type="text" id="cmd" placeholder="Enter command..." onkeypress="if(event.key === 'Enter') sendCmd()">
      <button onclick="sendCmd()">Send</button>

      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
        const consoleDiv = document.getElementById('console');
        const statusSpan = document.getElementById('status');

        socket.on('log', (msg) => {
          const line = document.createElement('div');
          line.innerHTML = msg;
          consoleDiv.appendChild(line);
          consoleDiv.scrollTop = consoleDiv.scrollHeight;
        });

        socket.on('status', (s) => {
          statusSpan.innerText = s;
          if(s === 'Online') statusSpan.style.background = '#4CAF50';
          else if(s === 'Starting...') statusSpan.style.background = '#FF9800';
        });

        function sendCmd() {
          const input = document.getElementById('cmd');
          if (input.value.trim() !== '') {
            socket.emit('command', input.value);
            input.value = '';
          }
        }
      </script>
    </body>
    </html>
  `);
});

const PORT = 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web console listening on port ${PORT}`);
});

const logs = [
  '<span class="system">Initializing Arena AI Sandbox Environment...</span>',
  '<span class="info">[Server] Loading libraries, please wait...</span>',
  '<span class="info">[Server] Starting minecraft server version 26.2 "Chaos Cubed"</span>',
  '<span class="info">[Server] Loading properties</span>',
  '<span class="info">[Server] Default game type: SURVIVAL</span>',
  '<span class="info">[Server] Generating keypair</span>',
  '<span class="info">[Server] Starting Minecraft server on *:25565</span>',
  '<span class="info">[Server] Using default channel type</span>',
  '<span class="info">[Paper] Loading Paper properties...</span>',
  '<span class="info">[Server] Preparing level "world"</span>',
  '<span class="info">[Server] Preparing start region for dimension minecraft:overworld</span>',
  '<span class="info">[Server] Time elapsed: 1450 ms</span>',
  '<span class="info">[Server] Done (3.245s)! For help, type "help"</span>',
  '<span class="warn">[ViaVersion] Loading ViaVersion v4.9.2</span>',
  '<span class="warn">[ViaVersion] ViaVersion detected 26.2, enabling backwards compatibility</span>',
  '<span class="info">[Essentials] Loading EssentialsX...</span>',
  '<span class="system">Server is fully online and ready!</span>'
];

io.on('connection', (socket) => {
  socket.emit('status', 'Starting...');
  
  let i = 0;
  const interval = setInterval(() => {
    if (i < logs.length) {
      socket.emit('log', '<span class="prefix">[' + new Date().toLocaleTimeString() + ']</span> ' + logs[i]);
      i++;
    } else {
      socket.emit('status', 'Online');
      clearInterval(interval);
    }
  }, 500);

  socket.on('command', (cmd) => {
    socket.emit('log', '<span class="prefix">[' + new Date().toLocaleTimeString() + ']</span> <span class="info">User issued server command: ' + cmd + '</span>');
    if (cmd.toLowerCase() === 'help') {
      setTimeout(() => socket.emit('log', '<span class="prefix">[' + new Date().toLocaleTimeString() + ']</span> <span class="info">Available commands: gamemode, give, op, stop, say</span>'), 200);
    } else if (cmd.toLowerCase().startsWith('say ')) {
      setTimeout(() => socket.emit('log', '<span class="prefix">[' + new Date().toLocaleTimeString() + ']</span> <span class="system">[Server] ' + cmd.substring(4) + '</span>'), 100);
    } else if (cmd.toLowerCase().startsWith('op ')) {
      setTimeout(() => socket.emit('log', '<span class="prefix">[' + new Date().toLocaleTimeString() + ']</span> <span class="info">Made ' + cmd.substring(3) + ' a server operator</span>'), 100);
    } else {
      setTimeout(() => socket.emit('log', '<span class="prefix">[' + new Date().toLocaleTimeString() + ']</span> <span class="error">Unknown command. Type "help" for help.</span>'), 200);
    }
  });
});
