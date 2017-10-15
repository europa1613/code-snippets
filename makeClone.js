console.log("=========================== Making <clone> ==================================\n");

var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var exec = childProcess.exec;

var COPY_CLONE = 'cp -a clone/. node_modules/clone/';

console.log("===================== Copying clone package =================================\n");
console.log(__dirname + '/clone/ ==> ', __dirname + '/node_modules/clone')
childProcess.execSync(COPY_CLONE, { cwd: __dirname, env: process.env, stdio: 'inherit' });
console.log("\n============================== Done! =========================================\n");
