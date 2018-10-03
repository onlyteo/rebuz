const db = require('../database');

connect = () => {
    const connection = db.get();
    return connection.collection('stats');
}

exports.init = () => {
}

exports.find = (team, handler) => {
    const collection = connect();
    collection.find({ team: team }).toArray(handler());
};

exports.save = (data, handler) => {
    const collection = connect();
    collection.insert(data, handler());
}