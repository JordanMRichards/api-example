import express from 'express';


const router = express.Router();
import userRoute from './users'

router.use("/users/", userRoute);

export default router;