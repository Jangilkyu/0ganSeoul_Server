require('dotenv').config();
const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray:false, mergeAttrs : true});
const fetch = require('node-fetch');
const City = require('../models/City');
const cityArr = require('./cityArr');
let index = require('../utils/index');

const fetchCitiesData = async(city) => {

    var uri = `${process.env.OPEN_API_SEOUL}/${process.env.API_KEY}/${process.env.TYPE}/${process.env.SERVICE}/${process.env.START_INDEX}/${process.env.END_INDEX}/${city}`;
    var res1 = encodeURI(uri);
    console.log(res1);
    await fetch(res1)
    .then((res) => res.text())
    .then((xml) => { 
        parser.parseStringPromise(xml).then(function (result) {
            const AREA_NM = result["SeoulRtd.citydata"].CITYDATA.AREA_NM;
            const LIVE_PPLTN_STTS = result["SeoulRtd.citydata"].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS;
            const ROAD_TRAFFIC_STTS = result["SeoulRtd.citydata"].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA;

            const city = {};
            city.AREA_NM = AREA_NM;
            city.LIVE_PPLTN_STTS = LIVE_PPLTN_STTS
            city.AVG_ROAD_DATA = ROAD_TRAFFIC_STTS;

            ++index.sharedInt;
            cityArr.push(city);
        });
    })
    .then(()=>{
        if(index.sharedInt === 50) {
          City.findOneAndDelete({ 'cities' : { '$exists': true} }, (err, doc) => {
            if (err) {
                  console.log(err);
                } else {
                  let newDoc = new City({ cities: cityArr });
                  newDoc.save((err, newDoc) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Deleted and re-created document:", newDoc);
                    }
                  });
                }
              });
        }
    });
}

module.exports = fetchCitiesData