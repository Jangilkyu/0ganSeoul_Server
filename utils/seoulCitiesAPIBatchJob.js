const schedule = require('node-schedule');
const citiesList = require('./citiesList');
const fetchCitiesData = require('./fetchCitiesData');
const City = require('../models/City');
let index = require('../utils/index');

const seoulCitiesAPIBatchJob = () => {
	const rule = new schedule.RecurrenceRule();
	rule.minute = [process.env.ZERO, process.env.HALFPAST]
	schedule.scheduleJob(rule, function() {
		index.sharedInt = 0;
		citiesList.map((city) => {
			fetchCitiesData(city);
		});
	});
}



module.exports = seoulCitiesAPIBatchJob;