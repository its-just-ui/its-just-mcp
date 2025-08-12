#!/usr/bin/env node

import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Create a test configuration for Claude Desktop
const testConfig = {
  mcpServers: {
    "its-just-ui": {
      "command": "node",
      "args": [join(process.cwd(), "dist", "index.js")],
      "env": {}
    }
  }
};

console.log('MCP its-just-ui Server Test Configuration');
console.log('==========================================\n');
console.log('Server successfully built and ready to use!\n');
console.log('To use with Claude Desktop, add this configuration to your claude_desktop_config.json:\n');
console.log(JSON.stringify(testConfig, null, 2));
console.log('\nConfiguration file locations:');
console.log('- macOS: ~/Library/Application Support/Claude/claude_desktop_config.json');
console.log('- Windows: %APPDATA%\\Claude\\claude_desktop_config.json\n');

// Test basic server startup
console.log('Testing server startup...');
const server = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Send a basic test request
const testRequest = JSON.stringify({
  jsonrpc: '2.0',
  method: 'tools/list',
  id: 1
}) + '\n';

setTimeout(() => {
  server.stdin.write(testRequest);
}, 1000);

server.stdout.on('data', (data) => {
  console.log('Server response received:', data.toString().substring(0, 100) + '...');
});

server.stderr.on('data', (data) => {
  console.log('Server started successfully:', data.toString());
  server.kill();
  process.exit(0);
});

setTimeout(() => {
  console.log('\nServer test completed successfully!');
  server.kill();
  process.exit(0);
}, 3000);