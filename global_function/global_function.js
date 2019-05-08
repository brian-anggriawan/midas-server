const azure = require('azure-storage');

const idRecord = (prefix) =>{
    let time = new Date(),
        id = prefix+time.getFullYear()+(time.getMonth()+1)+time.getDate()+time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();

    return id;
}

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const urlfile = '\\\\192.168.40.225\\midas-doc\\'

const configsp = {
    user: 'wh01',
    password: 'W4r3house',
    server: '192.168.0.7', 
    database: 'midas' 
};

const authAzure = azure.createFileService('DefaultEndpointsProtocol=https;AccountName=hddmtg;AccountKey=lJAaiYFxh46WptcXqRZf08zz8uGf/tOx+8t/cMz7cXAvRORiXJgig5Nav/ZV3NHG5Dy4fvEcefGXVNO6Ep1alQ==;EndpointSuffix=core.windows.net')





module.exports =  {idRecord , formatDate ,urlfile , configsp ,authAzure };