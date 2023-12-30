


const responseHandler = async (res, error, status, responseObject, message) =>{
    res.status(status).send({
        "error": error,
        "message": message,
        "data": responseObject
    });
}

export default responseHandler;