var express = require('express');
var fs = require('fs');
var app = express();
var dateFormat = require('dateformat');

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

var options = require('./options');

var MyContract;
var myContractInstance;


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host    : options.storageConfig.host,
    user    : options.storageConfig.user,
    password: options.storageConfig.password,
    database: options.storageConfig.database
});



var record_database = function(
        block_id, msg_sender, msg_value, contract_address, block_hash, log_index,
        transaction_hash, transaction_index, event_name, description
){

    var query = 'INSERT INTO contract_event ' +
        '(`block_id`, `msg_sender`, `msg_value`, `contract_address`, `block_hash`, `log_index`, `transaction_hash`, `transaction_index`, `event_name`, `description`, `datetime`)' +
        'VALUES (?,?,?,?,?, ?,?,?,?,?, now()); ';
    console.log(query);
    console.log(block_id);
    console.log(msg_sender);
    console.log(msg_value);

    connection.query(
        query,
        [block_id, msg_sender, msg_value, contract_address, block_hash, log_index, transaction_hash, transaction_index, event_name, description]
    , function(err, rows, fields) {
        if (err) throw err;
    });

}


var watchEvents = function(contract){

    if(typeof eventIssueManagementFee !== 'undefined' && eventIssueManagementFee){
        eventIssueManagementFee.stopWatching();
    }
    if(typeof eventMgmtIssueBountyToken !== 'undefined' && eventMgmtIssueBountyToken){
        eventMgmtIssueBountyToken.stopWatching();
    }
    if(typeof eventMgmtDistributed !== 'undefined' && eventMgmtDistributed){
        eventMgmtDistributed.stopWatching();
    }
    if(typeof eventMgmtInvestProject !== 'undefined' && eventMgmtInvestProject){
        eventMgmtInvestProject.stopWatching();
    }
    if(typeof eventLockFund !== 'undefined' && eventLockFund){
        eventLockFund.stopWatching();
    }
    if(typeof eventTransfer !== 'undefined' && eventTransfer){
        eventTransfer.stopWatching();
    }
    if(typeof eventMinTokensReached !== 'undefined' && eventMinTokensReached){
        eventMinTokensReached.stopWatching();
    }
    if(typeof eventCreatedToken !== 'undefined' && eventCreatedToken){
        eventCreatedToken.stopWatching();
    }
    if(typeof eventRefund !== 'undefined' && eventRefund){
        eventRefund.stopWatching();
    }
    if(typeof eventKickoff !== 'undefined' && eventKickoff){
        eventKickoff.stopWatching();
    }
    if(typeof eventFreeze !== 'undefined' && eventFreeze){
        eventFreeze.stopWatching();
    }
    if(typeof eventHarvest !== 'undefined' && eventHarvest){
        eventHarvest.stopWatching();
    }
    if(typeof eventRecord !== 'undefined' && eventRecord){
        eventRecord.stopWatching();
    }

    eventIssueManagementFee = contract.evIssueManagementFee({}, function(error, result) {
        if (!error) {
            var description = "Address: " + result.args.to + " purchased " + result.args.amount + " tokens. ";
            var msg = "["+ result.blockNumber +"] evIssueManagementFee -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {return console.log(err);}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventMgmtIssueBountyToken = contract.evMgmtIssueBountyToken({}, function(error, result) {
        if (!error) {
            var description = "Recipient Address: " + result.args._recipientAddress + ", token issued: " + result.args._amount + ", success: " + result.args._success + ". ";
            var msg = "["+ result.blockNumber +"] evMgmtIssueBountyToken -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {return console.log(err);}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventMgmtDistributed = contract.evMgmtDistributed({}, function(error, result) {
        if (!error) {
            var description = "Amount: " + result.args._amount + ", success: " + result.args._success + ". ";
            var msg = "["+ result.blockNumber +"] evMgmtDistributed -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {return console.log(err);}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventMgmtInvestProject = contract.evMgmtInvestProject({}, function(error, result) {
        if (!error) {
            var description = "Project wallet: " + result.args._projectWallet + ", amount: " + result.args._amount + ", result: " + result.args.result + ". ";
            var msg = "["+ result.blockNumber +"] evMgmtInvestProject -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {return console.log(err);}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventLockFund = contract.evLockFund({}, function(error, result) {
        if (!error) {
            var description = "Project wallet: " + result.args._projectWallet + ", amount: " + result.args._amount + ", result: " + result.args.result + ". ";
            var msg = "["+ result.blockNumber +"] evLockFund -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {return console.log(err);}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventTransfer = contract.evTransfer({}, function(error, result) {
        if (!error) {
            var description = "From: " + result.args._from + ", to: " + result.args._to + ", amount: " + result.args._amount + ". ";
            var msg = "["+ result.blockNumber +"] evTransfer -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {return console.log(err);}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventMinTokensReached = contract.evMinTokensReached({}, function(error, result) {
        if (!error) {
            var description = "value: " + result.args.value + " ";
            var msg = "["+ result.blockNumber +"] evMinTokensReached -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {return console.log(err);}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventCreatedToken = contract.evCreatedToken({}, function(error, result) {
        if (!error) {
            var description = "Address: " + result.args.to + " purchased " + result.args.amount + " tokens.";
            var msg = "["+ result.blockNumber +"] evCreatedToken -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventRefund = contract.evRefund({}, function(error, result) {
        if (!error) {
            var description = "To address: " + result.args.to + ", value: " + result.args.value + " wei, result: " + result.args.result + ".";
            var msg = "["+ result.blockNumber +"] evRefund -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventKickoff = contract.evKickoff({}, function(error, result) {
        if (!error) {
            var description = "Fiscal year: " + result.args._fiscal + "";
            var msg = "["+ result.blockNumber +"] evKickoff -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventFreeze = contract.evFreeze({}, function(error, result) {
        if (!error) {
            var description = "";
            var msg = "["+ result.blockNumber +"] evFreeze ";
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventHarvest = contract.evHarvest({}, function(error, result) {
        if (!error) {
            var description = "";
            var msg = "["+ result.blockNumber +"] evHarvest ";
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event, description);
        }
    });

    eventRecord = contract.evRecord({}, function(error, result) {
        if (!error) {
            var description = "eventType: " + result.args.eventType + ", message: " + result.args.message + "";
            var msg = "["+ result.blockNumber +"] evRecord -- " + description;
            msg += "\n    - address: " + result.address + "";
            msg += "\n    - blockHash: " + result.blockHash + "";
            msg += "\n    - logIndex: " + result.logIndex + "";
            msg += "\n    - transactionHash: " + result.transactionHash + "";
            msg += "\n    - transactionIndex: " + result.transactionIndex + "";
            msg += "\n    - event: " + result.event + "";
            console.log(msg);

            // console.log(result.args);

            fs.appendFile("/var/www/html/log.txt", "\n" + msg, function(err) {
                if(err) {}
            });

            record_database(result.blockNumber, result.args.msg_sender, result.args.msg_value, result.address, result.blockHash, result.logIndex,
                            result.transactionHash, result.transactionIndex, result.event + " - " + result.args.eventType, result.args.msg);
        }
    });


};


app.get('/', function(req, res){
    console.log('GET /')
    var html = fs.readFileSync('views/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.get('/logs', function(req, res){
    console.log('GET /logs')
    contract = req.query.contract;

    var query = "SELECT * FROM `contract_event` ";

    // Query data from MySQL
    if(contract){
        query = query + " WHERE `contract_address` = ? ";
    }else{
        contract = "";
    }

    // order by the latest event
    query = (query + " ORDER BY `contract_event`.`datetime` DESC;");
    console.log(query)


    // connection.connect();
    connection.query(query, [contract], function(err, rows){

        if(err)
            console.log("Error Selecting : %s ",err );

        for(var _i in rows){
            rows[_i].datetime_string = dateFormat(rows[_i].datetime, "hh:MM:ss TT") + " UTC";
            rows[_i].msg_value_wei = Number(rows[_i].msg_value);
            rows[_i].msg_value_ether = rows[_i].msg_value_wei / Math.pow(10, 18);
        }

        res.render('logs', {
            data: rows,
            contract: contract
        });
    });
    // connection.end();

});


app.post('/updateContract', function(req, res){
    console.log('POST /updateContract');

    address = req.body.address;
    if(!address){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"status": "failed", "message": "MISSING_PARAMETER", "details": "address"}));
        return
    }

    abiDefinition = req.body.abiDefinition;
    if(!abiDefinition){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"status": "failed", "message": "MISSING_PARAMETER", "details": "abiDefinition"}));
        return
    }

    MyContract = web3.eth.contract(JSON.parse(abiDefinition));
    myContractInstance = MyContract.at(address);

    watchEvents(myContractInstance);

    res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({"status": "success", "message": ""}));
});


app.post('/compile/solidity', function(req, res){
    console.log('POST /compile/solidity')

    source_string = req.body.source_string
    if(!source_string){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"status": "failed", "message": "MISSING_PARAMETER"}));
        return
    }
    try{
        result = web3.eth.compile.solidity(source_string)
    }catch(err){
        console.log(err.message)
        if(err.message.indexOf("Expected import directive or contract definition.") > -1){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "status": "failed",
                "message": "CONTRACT_INVALID",
                "details": "Expected import directive or contract definition."
            }));
        }else if(err.message.indexOf("solc: exit status") > -1){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "status": "failed",
                "message": "CONTRACT_INVALID",
                "details": err.message
            }));
        }else if(err.message.indexOf("Invalid JSON RPC response") > -1){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "status": "failed",
                "message": "CONTRACT_INVALID",
                "details": err.message
            }));
        }else{
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "status": "failed",
                "message": "ETH_SERVER_CONNECTION_ERROR"
            }));
        }
        return;
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
});




app.post('/', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Thanks for trying, but nothing here :(');
});

app.get('*', function(req, res){
    console.log('Not found')
    res.writeHead(400, {'Content-Type': 'text/html'});
    res.end("Page not found");
});

port = 5000;
app.listen(port);
console.log('Listening at http://localhost:' + port)
