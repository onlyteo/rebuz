exports.epochSeconds = () => {
    let epochMilliseconds = (new Date).getTime();
    return Math.round(epochMilliseconds / 1000);
}