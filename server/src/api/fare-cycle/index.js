import express from 'express';
import FareCycleController from './v1/controller'

const fareCycle = express.Router();

fareCycle.use('/v1/farecycle',FareCycleController);

export default fareCycle;