import express from 'express';
import validate from 'express-validation'
import userCtrl from '../controllers/users';
import validations from '../middleware/validations/user'
import auth from '../middleware/auth'

const router = express.Router();

router.route('/')
    .get(validate(validations.fetchMany), userCtrl.fetchMany)
    .post(validate(validations.create), userCtrl.create);

router.use('/login', auth.authorize, userCtrl.login);

router.route('/:id')
    .get(auth.verify, validate(validations.specific), userCtrl.fetchById)
    .put(auth.verify, validate(validations.update), userCtrl.update)    
    .delete(auth.verify, validate(validations.specific), userCtrl.delete);



export default router;
