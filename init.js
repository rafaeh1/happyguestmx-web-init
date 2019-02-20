'use strict';

const fs = require('fs'),
    fse = require('fs-extra'),
    path = require('path'),
    env = process.env;

const functionPath = `${env.INIT_CWD}`;

async function initializeLambda() {
    try {

        /* 
            * create index.js
            * create events
            * create package.json
        */
        //gatting config file from project config
        const configPath = path.join(functionPath, './../..',);
        const config = require(`${configPath}/config.json`);
        //checking if package.json exist
        const packageFile = require(`${functionPath}/package.json`);
        //copying index.js
        await fs.copyFileSync(`./src/index.js`, `${functionPath}/index.js`);
        //copying event files
        await fse.copySync(`./src/events`, `${functionPath}/events`);
        // const packageFile = await fs.copyFileSync(`./src/package.json`, `${functionPath}/package.json`);
    
        /*
            * adding project file with on each env
        */
        //ToDo add function name as folder
        let functionFile = require('./src/function');
        functionFile.name = "functionName"; //entry or folder name
        functionFile.description = "functionName";
        functionFile.role = functionFile.role.replace('account', config.AWS_ACCOUNT_ID);
        functionFile.environment.AWS_ACCOUNT_ID = config.AWS_ACCOUNT_ID;
        functionFile.environment.REGION = config.REGION;
        /* 
            * writing function files
            * add relative path
        */
        fs.writeFileSync(`${functionPath}/function.json`, JSON.stringify(functionFile, null, 4));
        fs.writeFileSync(`${functionPath}/function.qa.json`, JSON.stringify(functionFile, null, 4));
        fs.writeFileSync(`${functionPath}/function.prod.json`, JSON.stringify(functionFile, null, 4));
        console.log('functionFile: ', functionFile);
        return 'lambda function initialized successfully';
    }
    catch(err) {
        console.log('ERROR: ', err);
    }
}

initializeLambda();


