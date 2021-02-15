let uniqueIdIndex = 0;


const utils = {
    uniqueId: function () {
        uniqueIdIndex++;
        if (uniqueIdIndex > 100000000){
            uniqueIdIndex = 0;
        }
        return Date.now() + "_" + uniqueIdIndex;
    },
    nowSecond: function () {
        return Math.ceil(Date.now() / 1000);
    }
}

module.exports = utils