//jshint esversion:6

module.exports.getDate = function(){

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let today = new Date();

    let day = today.toLocaleDateString("en-US", options);

    return day;
};

module.exports.getDay = function(){

    let options = {
        weekday: 'long',
    };
    let today = new Date();

    let day = today.toLocaleDateString("en-US", options);

    return day;
};



