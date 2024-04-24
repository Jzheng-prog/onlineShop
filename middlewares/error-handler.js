
function handleError(error, req, res, next){

    console.error('Error:', error);


    if(error.code ===404){
        return res.status(404).render('shared/404')
    }
    // console.log('ErrorHandle Middleware', res.locals)

    res.status(500).render('shared/500');
}

module.exports = handleError;