const azure = require('azure-storage');
const uid = require('cuid');

exports.idRecord = (prefix) =>{
    //let time = new Date(),
        //id = prefix+time.getFullYear()+(time.getMonth()+1)+time.getDate()+time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();

    return `${prefix}${uid(50)}`
}

exports.formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

exports.urlfile = '\\\\192.168.40.225\\midas-doc\\';


exports.configsp = {
    user: 'wh01',
    password: 'W4r3house',
    server: '192.168.0.7', 
    database: 'midas' 
};

exports.authAzure = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=hddmtg;AccountKey=4RqL7UtnfGzl0qGODSyppXDhey3xPQf+EzxhyLap1OatDilVDSdDXsFMTXfivui0wdONU3ZygFsCobQmt9ExcA==;EndpointSuffix=core.windows.net')

