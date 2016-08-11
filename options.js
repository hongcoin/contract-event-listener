var fs = require('fs'),
configPath = './config.json';
//configPath = __dirname + '/config.json' // for different directory location
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.storageConfig = parsed;
