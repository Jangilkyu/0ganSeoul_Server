require('dotenv').config();
const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray:false, mergeAttrs : true});
const fetch = require('node-fetch');
const City = require('../models/City');
 const {OPEN_API_SEOUL, API_KEY, TYPE, SERVICE, START_INDEX, END_INDEX} = process.env;

const fetchCitiesData = async(city) => {

    var uri = `${OPEN_API_SEOUL}/${API_KEY}/${TYPE}/${SERVICE}/${START_INDEX}/${END_INDEX}/${city}`;
    var encodedURI = encodeURI(uri);
    var response = await fetch(encodedURI);
    var xml = await response.text();
    var res = await parser.parseStringPromise(xml);

    const { AREA_NM, LIVE_PPLTN_STTS, ROAD_TRAFFIC_STTS, SBIKE_STTS } = res["SeoulRtd.citydata"].CITYDATA;
    const { ROAD_MSG, ROAD_TRAFFIC_IDX, ROAD_TRFFIC_TIME, ROAD_TRAFFIC_SPD } = ROAD_TRAFFIC_STTS.AVG_ROAD_DATA;
    const sBikeStats = SBIKE_STTS ? SBIKE_STTS.SBIKE_STTS : [];
    const sBikeSpotNames = sBikeStats;

    const { 
        LIVE_PPLTN_STTS: { 
            AREA_CONGEST_LVL, 
            AREA_CONGEST_MSG, 
            AREA_PPLTN_MIN, 
            AREA_PPLTN_MAX, 
            MALE_PPLTN_RATE, 
            FEMALE_PPLTN_RATE, 
            PPLTN_RATE_0, 
            PPLTN_RATE_10, 
            PPLTN_RATE_20, 
            PPLTN_RATE_30, 
            PPLTN_RATE_40, 
            PPLTN_RATE_50, 
            PPLTN_RATE_60, 
            PPLTN_RATE_70, 
            RESNT_PPLTN_RATE, 
            NON_RESNT_PPLTN_RATE, 
            REPLACE_YN, 
            PPLTN_TIME 
        } 
    } = LIVE_PPLTN_STTS;
    
    const cityObj = { 
        AREA_NM, 
        LIVE_PPLTN_STTS: { 
            AREA_CONGEST_LVL, 
            AREA_CONGEST_MSG, 
            AREA_PPLTN_MIN, 
            AREA_PPLTN_MAX, 
            MALE_PPLTN_RATE, 
            FEMALE_PPLTN_RATE, 
            PPLTN_RATE_0, 
            PPLTN_RATE_10, 
            PPLTN_RATE_20, 
            PPLTN_RATE_30, 
            PPLTN_RATE_40, 
            PPLTN_RATE_50, 
            PPLTN_RATE_60, 
            PPLTN_RATE_70, 
            RESNT_PPLTN_RATE, 
            NON_RESNT_PPLTN_RATE, 
            REPLACE_YN, 
            PPLTN_TIME 
        }, 
        AVG_ROAD_DATA: { 
            ROAD_MSG, 
            ROAD_TRAFFIC_IDX, 
            ROAD_TRFFIC_TIME, 
            ROAD_TRAFFIC_SPD 
        },
        SBIKE_STTS: sBikeSpotNames,
    };
    
    City.updateOne(
      { "cities.AREA_NM": cityObj.AREA_NM },
      { $set: { "cities.$": cityObj } },
      (err, result) => {
        if (err) {
          console.log("Error: ", err);
        } else {
            console.log("result: ", result);
        }
      }
    );
}

module.exports = fetchCitiesData