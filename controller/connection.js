import pool from '../config/db'

const getAllInfo = async(req, res) =>{
   try{
      pool.getConnection((err) =>{
         if(err){
            console.log("error connecting to db...")
         }
         console.log("conected to db")
      })
      var showInfoTable = `SELECT * FROM login`;
      const data = await pool.query(showInfoTable, (err, res, fields) => {
         if (err) throw err;
         //console.log(res);
      });
      //console.log(data)
      res.send(data)
   }catch(err){
      console.log(err)
   }
}

export {getAllInfo}