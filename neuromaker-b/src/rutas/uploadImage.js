import { Router } from 'express'
const c = console.log

const router = Router()
router.post('/',(req,res)=>{
    res.json({
        path:`${req.file.filename}`
    })
    c(`http://localhost:4000/uploads/${req.file.filename}`)
})
export default router