const sql = require('mssql'),
      global = require('../global_function/global_function');


exports.List = (req , res)=>{
    let { iduser , idperiod , flag , period  , dpt} = req.params;

    if (flag === '2') {
        new sql.ConnectionPool(global.configsp).connect().then(pool =>{
            return pool.request().query(`
                    EXEC [dbo].[Laporan_Analisis] 
                    @inflag = 1,
                    @iduser = ${iduser},
                    @idperiod = ${idperiod},
                    @period = ${period},
                    @iddept = '';
            `).then(row =>{
                let  data = row.recordset;
                res.json(data)
            })
        }) 
    }else{
        new sql.ConnectionPool(global.configsp).connect().then(pool =>{
            return pool.request().query(`
                    EXEC [dbo].[Laporan_Analisis] 
                    @inflag = 2,
                    @iduser = '',
                    @idperiod = ${idperiod},
                    @period = ${period},
                    @iddept = ${dpt};
            `).then(row =>{
                let  data = row.recordset;
                res.json(data)
            })
        }) 
    }
    
}

exports.Listdetail = (req , res)=>{
    let {flag , idperiod , idrepo } = req.params;

        new sql.ConnectionPool(global.configsp).connect().then(pool =>{
            return pool.request().query(`
                EXEC  [dbo].[detail_laporan_analis] 
                @inflag = ${flag},
                @idrepo = ${idrepo},
                @idperiod = ${idperiod};
            `).then(row =>{
                let  data = row.recordset;
                res.json(data)
            })
        })  
    

}