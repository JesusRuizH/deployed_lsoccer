import nc from "next-connect";
import { pool } from '../../../../config/db'
import multer from "multer";
import path from "path";


export const config = {
  api: {
    bodyParser: false,
  },
 };

const handler = nc();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => {
  console.log("req.file", req.file.filename);
  console.log("req.body", req.body.data);
  try {
    const [result] = await pool.query(`UPDATE recibo SET imagen_pago = $1 WHERE pk_recibo = $2 `, [req.file.filename, req.body.data])
    return res.status(200).json({result})
  }catch (error) {
    return res.status(500).json({message: error.message})
  }
});

export default handler;