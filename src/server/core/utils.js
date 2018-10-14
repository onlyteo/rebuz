exports.epochSeconds = () => {
    let epochMilliseconds = (new Date).getTime();
    let epochSeconds = Math.round(epochMilliseconds / 1000);
    console.log('Time: ' + epochSeconds);
    return epochSeconds;
}