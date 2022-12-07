const configs = require('../../app-services-config').configs
const QNeo4j = require('@tech/qneo4j')

const db = new QNeo4j({
    url: configs.neo4j.url_neo4j_bolt,
    username: configs.neo4j.neo4j_user,
    password: configs.neo4j.neo4j_password,
    autoCloseDriver: false,
    driverConfig: {
        maxConnectionLifeTime: 3 * 60 * 60 * 1000, //3hrs
        maxConnectionPoolSize: 10000,
        connectionAcquisitionTimeOut: 2 * 60 * 1000 //120s
    }
}) 

const dbVendas = new QNeo4j({
    url: configs.neo4jVendas.url_neo4j_bolt,
    username: configs.neo4jVendas.neo4j_user,
    password: configs.neo4jVendas.neo4j_password,
    autoCloseDriver: false,
    driverConfig: {
        maxConnectionLifeTime: 3 * 60 * 60 * 1000, //3hrs
        maxConnectionPoolSize: 10000,
        connectionAcquisitionTimeOut: 2 * 60 * 1000 //120s
    }
})

module.exports = { db, dbVendas };