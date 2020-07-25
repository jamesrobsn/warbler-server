function errorHandler(error, request, response, next){
    // set locals, only providing error in development
    // response.locals.message = err.message;
    // response.locals.error = req.app.get('env') === 'development' ? err : {};
    
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Opps! Something went wrong."
        }
    });
}

module.exports = errorHandler;