import User from '../models/user.model.js'
import Mongoose from 'mongoose';

function formatUserDBObject(userObj){
    const newObject = {};
    newObject.id = userObj._id;
    newObject.givenName = userObj.givenName;
    newObject.familyName = userObj.familyName;
    newObject.email = userObj.email;
    newObject.createdAt = userObj.createdAt; 
    return newObject; 
}

export default {

    login (req, res, next) {
        if(res.locals.authorized){
            res.status(200).json({
                token: res.locals.authorized
            });
        }else{
            res.sendStatus(401);
        }
    },

    fetchById (req, res, next) {
        User.findOne({'_id':req.params.id}).then((result)=>{
            if(result){
                return res.status(200).json(formatUserDBObject(result));
            }else{
                return res.sendStatus(404);
            }
     }).catch(err => next(err));
    },

    fetchMany (req, res, next) {
        const paginateObj = {};
        paginateObj.next = req.query.cursor || null;
        paginateObj.limit = (typeof req.query.limit !== undefined && req.query.limit<=100) ? parseInt(req.query.limit) : 10;
        User.paginate(paginateObj).then((result)=>{
            let usersMapped = result.results.map(item => formatUserDBObject(item));
            return res.status(200).json({
                'users': usersMapped,
                'cursor': result.next
            });
        }).catch(err => next(err));
    },

    create (req, res, next) {
        User.create({
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            email: req.body.email,
            password: req.body.password
        }).then(inserted => {
            return res.status(201).json(formatUserDBObject(inserted));
        }).catch(err => next(err));
    },

    update (req, res, next) {
        const updateObj = {};
        if(req.body.givenName) updateObj['givenName'] = req.body.givenName;
        if(req.body.familyName) updateObj['familyName'] = req.body.familyName;
        if(req.body.email) updateObj['email'] = req.body.email;
        
        User.updateOne({_id: req.params.id}, {$set: updateObj}).then((updated)=>{
            if(updated.nModified>0){
                return res.sendStatus(204);
            }else{
                return res.sendStatus(404);
            }
            }).catch(err => next(err));
    },

    delete (req, res, next) {
        User.deleteOne({_id: req.params.id}).then((removed)=>{
            if(removed.deletedCount>0){
                return res.sendStatus(204);
            }else{
                return res.sendStatus(404);
            }
        }).catch(err => next(err));
    }

}
