var express = require('express');
var router = express.Router();

var ForecastServices = require('./../../services/ForecastServices.js')

var SimpleStat = require ("./../../services/SimpleStat.js")


router.get('/forecast', async (req, res) => {
    
    // let locNames = ['Bordeaux','Chateauneuf','Gaillac', 'Picstloup']
    
    let locName =  req.query.locName;
    let locForecast = await ForecastServices.getForecasts(locName)
    res.json( 
            {
                locName:locName,
                data:locForecast
            }
        )
});

router.post('/forecast', async (req, res) => {
    
    // let locNames = ['Bordeaux','Chateauneuf','Gaillac', 'Picstloup']
    
    let locName =  req.body.locName;
    let locForecast = await ForecastServices.getForecasts(locName)
    res.json( 
            {
                locName:locName,
                data:locForecast
            }
        )
});


router.get('/formatAllForecasts', async (req, res) => {
    res.json(await formatAllForecasts())
});

router.post('/formatAllForecasts', async (req, res) => {
    res.json(await formatAllForecasts())
});

async function formatAllForecasts(){
       /*
        Expected formated forecasts
            locName.inout.member.Dates []
        
        Example
        {
            Bordeaux.input.0.Dates
            Bordeaux.input.0.ETPS
            ...
        }
    */
    
   let locNames = ['Bordeaux','Chateauneuf','Gaillac', 'Picstloup']
   let fForecasts = {}
   for(let locName of locNames){
       
       let locForecats = await ForecastServices.getForecasts(locName)


        //  Format Input Member

        // input members 
       let InMembers = []
       for( let input of locForecats.input){
           if(!InMembers.includes(input.Member)){
               InMembers.push(input.Member)
           }
       }

       

       // formated input members
       let fInMembers ={}
       for(let m of InMembers){
           fInMembers[m]={
               Dates : [],
               ETPs : [],
               Rains: []
           }
       }

       for( let input of locForecats.input){
           fInMembers[input.Member].Dates.push(input.Date)
           fInMembers[input.Member].ETPs.push(input.ETP)
           fInMembers[input.Member].Rains.push(input.Pluie)
       }

       const Dates = fInMembers[0].Dates

       // input stat

       let fInStat ={

           Dates: Dates,

           ETP:{
               p0:[],
               p25:[],
               p50:[],
               p75:[],
               p100:[]
           },

           Rain:{
                p0:[],
                p25:[],
                p50:[],
                p75:[],
                p100:[]
            }
       }


       for( let idx=0; idx< Dates.length; idx ++){

            fInMemberETPs = []
            for(let m in fInMembers){
                fInMemberETPs.push(fInMembers[m].ETPs[idx])
            }
            fInStat.ETP.p0.push( SimpleStat.percentil(fInMemberETPs,0.00));
            fInStat.ETP.p25.push( SimpleStat.percentil(fInMemberETPs,0.25));
            fInStat.ETP.p50.push(SimpleStat.percentil(fInMemberETPs,0.50));
            fInStat.ETP.p75.push(SimpleStat.percentil(fInMemberETPs,0.75));
            fInStat.ETP.p100.push(SimpleStat.percentil(fInMemberETPs,1.00));

       }

       for( let idx=0; idx< Dates.length; idx ++){

            fInMemberRains = []
            for(let m in fInMembers){
                fInMemberRains.push(fInMembers[m].Rains[idx])
            }
            fInStat.Rain.p0.push( SimpleStat.percentil(fInMemberRains,0.00));
            fInStat.Rain.p25.push( SimpleStat.percentil(fInMemberRains,0.25));
            fInStat.Rain.p50.push(SimpleStat.percentil(fInMemberRains,0.50));
            fInStat.Rain.p75.push(SimpleStat.percentil(fInMemberRains,0.75));
            fInStat.Rain.p100.push(SimpleStat.percentil(fInMemberRains,1.00));

        }


       // Format Result 

       let ResMembers = []
       for( let result of locForecats.result){
           if(!ResMembers.includes(result.Member)){
               ResMembers.push(result.Member)
           }
       }



       let fResMembers ={}
       for( m of ResMembers){
           fResMembers[m]={
               Dates : [],
               FTSWtots : [],
           }
       }

       for( let result of locForecats.result){
           fResMembers[result.Member].Dates.push(result.Date)
           fResMembers[result.Member].FTSWtots.push(result.FTSWtot)
       }


        // result stat

        let fResStat ={

            Dates: Dates,

            FTSWtot:{
                p0:[],
                p25:[],
                p50:[],
                p75:[],
                p100:[]
            },
        }
     
     
        for( let idx=0; idx< Dates.length; idx ++){
    
                fResMemberFTSWtots = []
                for(let m in fResMembers){
                    fResMemberFTSWtots.push(fResMembers[m].FTSWtots[idx])
                }
                fResStat.FTSWtot.p0.push( SimpleStat.percentil(fResMemberFTSWtots,0.00));
                fResStat.FTSWtot.p25.push( SimpleStat.percentil(fResMemberFTSWtots,0.25));
                fResStat.FTSWtot.p50.push(SimpleStat.percentil(fResMemberFTSWtots,0.50));
                fResStat.FTSWtot.p75.push(SimpleStat.percentil(fResMemberFTSWtots,0.75));
                fResStat.FTSWtot.p100.push(SimpleStat.percentil(fResMemberFTSWtots,1.00));
    
        }

       // Format Min stat 

       
       fInOut = {
            input: fInMembers,
            inputStat: fInStat,
            result: fResMembers,
            resultStat: fResStat,
       }

       fForecasts[locName]=fInOut
       
    }
       
    return fForecasts
}


router.post('/allForecasts', async (req, res) => {
    
    let locNames = ['Bordeaux','Chateauneuf','Gaillac', 'Picstloup']
    allForecasts = []
    for(let locName of locNames){
        
        let locForecats = await ForecastServices.getForecasts(locName)
        allForecasts.push(
            {
                locName:locName,
                data:locForecats
            }
        )
        
     }
    res.json(allForecasts)
});




module.exports = router;