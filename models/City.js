const mongoose = require("mongoose");
// const {getNowInSeoul} = require("../utils/getNowInSeoul");


const LIVE_PPLTN_STTS = new mongoose.Schema({
  AREA_CONGEST_LVL: {
    type: String,
  },

  AREA_CONGEST_MSG: {
    type: String,
  },

  AREA_PPLTN_MIN: {
    type: String,
  },

  AREA_PPLTN_MAX: {
    type: String,
  },

  MALE_PPLTN_RATE: {
    type: String,
  },

  FEMALE_PPLTN_RATE: {
    type: String,
  },

  PPLTN_RATE_0: {
    type: String,
  },

  PPLTN_RATE_10: {
    type: String,
  },

  PPLTN_RATE_20: {
    type: String,
  },

  PPLTN_RATE_30: {
    type: String,
  },

  PPLTN_RATE_40: {
    type: String,
  },

  PPLTN_RATE_50: {
    type: String,
  },

  PPLTN_RATE_60: {
    type: String,
  },

  PPLTN_RATE_70: {
    type: String,
  },

  RESNT_PPLTN_RATE: {
    type: String,
  },

  NON_RESNT_PPLTN_RATE: {
    type: String,
  },

  REPLACE_YN: {
    type: String,
  },

  PPLTN_TIME: {
    type: String,
  },

});

const AVG_ROAD_DATA = new mongoose.Schema({
  ROAD_MSG: {
    type: String,
  },

  ROAD_TRAFFIC_IDX: {
    type: String,
  },
  ROAD_TRFFIC_TIME: {
    type: String,
  },
  ROAD_TRAFFIC_SPD: {
    type: String,
  },
});

const SBIKE_STTS = new mongoose.Schema({
  SBIKE_SPOT_NM: {
    type: String,
  },
  SBIKE_SPOT_ID: {
    type: String,
  },
  SBIKE_SHARED: {
    type: String,
  },
  SBIKE_PARKING_CNT: {
    type: String,
  },
  SBIKE_RACK_CNT: {
    type: String,
  },
  SBIKE_X: {
    type: String,
  },
  SBIKE_Y: {
    type: String,
  },
});

const Coordinate = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  }
});

const CitySchema = new mongoose.Schema({

  LIVE_PPLTN_STTS: {
    type: LIVE_PPLTN_STTS,
  },

  AVG_ROAD_DATA: {
    type: AVG_ROAD_DATA,
  },

  SBIKE_STTS: {
    type: [SBIKE_STTS],
  },

  AREA_NM: {
    type: String,
  },

  Coordinate: {
    type: Coordinate,
  },

  Category: {
    type: String,
  },

});

const CitiesSchema = new mongoose.Schema({
  cities: [CitySchema],

});

module.exports = mongoose.model("City", CitiesSchema);
