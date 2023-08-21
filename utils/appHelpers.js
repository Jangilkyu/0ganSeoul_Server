const isProd = () => {
    return process.env.ENVIROMENT == "PRODUCTION";
}
const mongoURI = () => {
    const mongoURI = isProd() ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV
    console.log(`is production? ${isProd()}`);

    return mongoURI;
};

module.exports = {
    mongoURI,
};