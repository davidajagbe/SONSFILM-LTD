// ErrorMiddleware.js
import multer from "multer";

const NotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const ErrorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectID') {
        statusCode = 404;
        message = `Resource Not Found`;
    }

    if (err instanceof multer.MulterError) {
        if (!res.headersSent) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({
                    message: 'File upload error',
                    error: 'Only one image file is allowed for the advertisement.'
                });
            }
            return res.status(400).json({ message: 'File upload error', error: err.message });
        } else {
            console.error('File upload error (response already sent):', err);
        }
    } else if (err) {
        if (!res.headersSent) {
            return res.status(statusCode).json({
                message,
                stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
            });
        } else {
            console.error('Server error (response already sent):', err);
        }
    } else {
        next();
    }
};

export { NotFound, ErrorHandler };