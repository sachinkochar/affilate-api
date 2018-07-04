import express from 'express';
const router= express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling Get orders'
    })
});

router.post('/save',(req,res,next)=>{
    console.log(req.body,'post')
    const name= req.body.name
    res.status(200).json({
        message: 'Handling Post request ',
        data:name
    })
})

router.get('/:orderId',(req,res,next)=>{
    res.status(201).json({
        message: 'Order details',
        id:req.params.orderId
    })
})

router.delete('/:orderId',(req,res,next)=>{
    res.status(201).json({
        message: 'Order deleted',
        id:req.params.orderId
    })
})


export default router