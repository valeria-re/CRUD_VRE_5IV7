const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/',(req,res)=>{
    
    conexion.query('SELECT * FROM usuario',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('index',{results:results});
        }
    })
})

//crear registros
router.get('/create',(req,res)=>{
    res.render('create');
})

const crud = require('./controllers/crud');
router.post('/save', crud.save)

//editar registros
router.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM usuario WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit',{user:results[0]});
        }
    })
})
 router.post('/update',crud.update);

 //eliminar registro 
 router.get('/delete/:id',(req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM usuario WHERE id = ?',[id] ,(error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    })
 })
module.exports = router;