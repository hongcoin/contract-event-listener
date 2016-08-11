NodeJS Backend for HONG Contract Event listener
================

## Live Version

http://107.178.211.223:5000/logs



## Software requirement

### NodeJS
- Check package.json for details: execute `npm install`

### Geth
- This program requires existence of `geth`.
- To start geth, execute `sudo geth --rpc console`

### MySQL
- You will need a MySQL instance running to save log data. Copy the file `config.json.tmpl` as `config.json`, and fill in access info to your MySQL server.




## Run the server

1. Deploy a contract with Mist.

2. Type `nodejs listener.js` to start server. The server will be up at http://localhost:5000. Paste your contract source code at http://localhost:5000, then pick the contract name deployed.

3. Paste the contract address in the form.

4. Submit the form. Contract events will be watched.

5. View logs from http://localhost:5000/logs.

