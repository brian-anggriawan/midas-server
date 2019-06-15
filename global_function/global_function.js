const azure = require('azure-storage');
const uid = require('cuid');
const sambaClient = require('samba-client');

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

exports.urlfile = ()=>{
    let os = process.platform;

    if (os === 'win32' || os === 'win64' ) {
        return '\\\\192.168.40.225\\midas-doc\\';
    }else if( os === 'linux'){
        return '//192.168.40.225/midas-doc';
    }else{
        console.log('OS Tidak Terdaftar')
    }
    
} 

exports.smbClient = new sambaClient({
    address: this.urlfile()
  
});

exports.replace = ( str )=>{

  var res = str.replace(/ /g,'-' );
  var res1 = res.replace(/--|---|----|-----|------/g,'-' );
  var res2 = res1.replace(/--|---|----|-----|------/g,'-' );
  var res3 = res2.replace(/--|---|----|-----|------/g,'-' );
  var res4 = res3.replace(/--|---|----|-----|------/g,'-' );
  var res5 = res4.replace(/--|---|----|-----|------/g,'-' );

  return res5;
}



exports.configsp = {
    user: 'wh01',
    password: 'W4r3house',
    server: '192.168.0.7', 
    database: 'midas' 
};

exports.authAzure = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=hddmtg;AccountKey=4RqL7UtnfGzl0qGODSyppXDhey3xPQf+EzxhyLap1OatDilVDSdDXsFMTXfivui0wdONU3ZygFsCobQmt9ExcA==;EndpointSuffix=core.windows.net')

