
const errorMiddleware = (
    
) => {
    console.log(err)
    err.message ||= "Some error occured while performing the operation"
    err.statusCode ||= 500
    if(err.name==="CastError"){
        err.message="Invalid Id"
    }
    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}

const asyncErrorHandler=
(func)=>(
    
)=>{
    return Promise.resolve(func(req,res,next)).catch(next)
}

module.exports = { errorMiddleware,asyncErrorHandler};