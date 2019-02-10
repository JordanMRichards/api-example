import config from '../config/config'
import validate from 'express-validation'

export default function errorHandler(err, req, res, next){
    if(err instanceof validate.ValidationError){
        res.status(err.status).json(err);
    }else if(err.name && err.name=="ValidationError"){
        return res.status(400).json({
            status: 400,
            message: err.message
        });       
    }else{
        return res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message
        });
    }
}