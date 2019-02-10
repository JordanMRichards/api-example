import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import User from '../models/user.model'
import bcrypt from 'bcrypt'

export default {
    authorize(req,res,next){
        res.locals.authorized = false;
        if(!req.body.email||!req.body.password){
            return next();
        }
        User.findOne({email: {$eq: req.body.email}}).then((user)=>{
            if(req.body.email === user.email) { 
                bcrypt.compare(req.body.password, user.password, (err, comparisonCheck) => {
                    if(err||!comparisonCheck) return next();
                    jwt.sign({'id':user['_id']}, config.jwtSecret, { expiresIn: config.jwtDuration },(err, token) => {
                        if(err) return next();
                        res.locals.authorized = token;
                        next();
                    });
                })
            } else {
                next();
            }
        }).catch(err =>{
            res.locals.authorized = false;
            next();           
        });
    },
    verify(req, res, next) {
        const header = req.headers['authorization'];
        if(typeof header !== 'undefined') {
            if(!req.params.id){
                return res.sendStatus(400);
            }
            const bearer = header.split(' ');
            const token = bearer[1];

            req.token = token;
            jwt.verify(req.token, config.jwtSecret, (err, data) => {
                if(err) return res.sendStatus(401);
                if(data.id==req.params.id){
                    next();
                }else{
                    return res.sendStatus(401);
                }
            });

        } else {
            res.sendStatus(401)
        }
    }
}