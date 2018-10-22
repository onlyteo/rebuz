// Modules
const repository = require('../db/stats')

exports.find = (event, team, handler) => {
    let query = {};
    if (event) {
        query = { event: event }
    }
    if (team) {
        query = { ...query, team: team }
    }
    repository.find(query, (err, result) => {
        if (err) {
            handler(err, undefined);
        } else if (result) {
            const stats = result.sort().map((item) => {
                return {
                    event: item.event,
                    team: item.team,
                    question: item.question,
                    created: item.created,
                    modified: item.modified
                };
            });
            handler(err, stats);
        } else {
            handler(err, []);
        }
    });
};

exports.save = (stats, handler) => {
    repository.get(stats, (err, result) => {
        if (err) {
            handler(err, 0);
        } else if (result) {
            repository.update(stats, (err, res) => {
                if (err) {
                    handler(err, 0);
                } else {
                    const { modifiedCount } = res;
                    handler(err, modifiedCount);
                }
            });
        } else {
            repository.save(stats, (err) => {
                if (err) {
                    handler(err, 0);
                } else {
                    handler(err, 1);
                }
            });
        }
    });
}

exports.delete = (event, team, handler) => {
    let query = {};
    if (event) {
        query = { event: event }
    }
    if (team) {
        query = { ...query, team: team }
    }
    repository.delete(query, (err) => {
        handler(err);
    });
};