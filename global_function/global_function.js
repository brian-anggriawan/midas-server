
const idRecord = (prefix) =>{
    let time = new Date(),
        id = prefix+time.getFullYear()+(time.getMonth()+1)+time.getDate()+time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();

    return id;
}


module.exports = {idRecord};