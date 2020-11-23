path = require('path');
fs = require('fs');
rl = require('readline');

// simpleStat = require ("./SimpleStat.js")

class ForecastServices{

    static async  getForecasts (locName){
        let dataFolderPath ='./server/data/'
        let locForecastJsonFName = path.resolve(`${dataFolderPath}walis_${locName}_output.json`)
        let locForecasts ={}
        try{
            let locForecastJsonData = await fs.readFileSync(locForecastJsonFName);
            locForecasts = JSON.parse(locForecastJsonData);
            console.log(`loaded ${locForecastJsonFName}`)

        }catch(errReadJsonFile){
            console.error(errReadJsonFile)
        }
        return locForecasts;
    }

    static async  getFormatedForecasts (locName){
        let dataFolderPath ='./server/data/'
        let locForecastJsonFName = path.resolve(`${dataFolderPath}walis_${locName}_output.json`)
        let locForecasts ={}
        try{
            let locForecastJsonData = await fs.readFileSync(locForecastJsonFName);
            locForecasts = JSON.parse(locForecastJsonData);
            console.log(`loaded ${locForecastJsonFName}`)

        }catch(errReadJsonFile){
            console.error(errReadJsonFile)
        }
        return locForecasts;
    }
}

module.exports = ForecastServices;