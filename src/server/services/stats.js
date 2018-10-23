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
                    tries: item.tries,
                    status: item.status,
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
    const query = { event: stats.event, team: stats.team, question: stats.question };
    repository.get(query, (err, result) => {
        if (err) {
            handler(err, 0);
        } else if (result) {
            const updateStats = { tries: result.tries + 1, status: stats.status };
            repository.update(query, updateStats, (err, res) => {
                if (err) {
                    handler(err, 0);
                } else {
                    const { modifiedCount } = res;
                    handler(err, modifiedCount);
                }
            });
        } else {
            const saveStats = { ...stats, tries: 1 };
            repository.save(saveStats, (err) => {
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