const NotFound = (req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error)
};

const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;

    // if (err.name === 'CastError' && err.kind === 'ObjectID'){
    //     statusCode = 404;
    //     message = `Resource Not Found`;
    // }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export {NotFound, ErrorHandler};