import express from 'express';
import busTypeController from './v1/controller'

const busType = express.Router();

busType.use('/v1/bustype',busTypeController);

export default busType;