var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var exec = childProcess.exec;

var npmOption = '-npm';
var yarnOption = '-yarn';
var INSTALL_COMMAND = process.argv.slice(2)[0] === yarnOption ? 'yarn install' : 'npm install';


var allModules = fs.readdirSync(__dirname)
    .filter(function(fileOrDir) {
        return fs.statSync(path.resolve(__dirname, fileOrDir))
            .isDirectory();
    });
console.log('\n');
console.log("========================= Modules =================================");
console.log(allModules);
console.log("========================= Modules =================================");
console.log('\n');
console.log('*********************************************************************');
console.log('************************** ' + INSTALL_COMMAND + ' *****************************');
console.log('*********************************************************************');
allModules.forEach(function(module) {
    var installPath = path.join(__dirname, module);
    var isInstallable = fs.existsSync(path.join(installPath, 'package.json'));
    isInstallable && installModule(installPath);
});

function installModule(installTarget) {
    console.log('\n');
    console.log("===================== Installing =================================");
    console.log('==> ', installTarget, ' is installing...')
    childProcess.execSync(INSTALL_COMMAND, { cwd: installTarget, env: process.env, stdio: 'inherit' });
    console.log("======================= Done! ====================================");
    console.log('\n');
}
