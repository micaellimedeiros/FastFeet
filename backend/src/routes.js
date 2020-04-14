import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CepController from './app/controllers/CepController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import DeliveredDeliveryController from './app/controllers/DeliveredDeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import authMiddleware from './app/middleware/auth';
import adminAuthMiddleware from './app/middleware/adminAuth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/cep', CepController.show);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/deliverymans/:id', DeliverymanController.show);
routes.get('/deliverymans/:id/deliveries', DeliveryStatusController.index);
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/delivery/:id/problems', DeliveryProblemsController.show);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);

routes.put(
  '/deliverymans/:deliveryman_id/deliveries/:id',
  DeliveryController.update
);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

routes.get('/deliverymans/:id/delivered', DeliveredDeliveryController.index);

routes.use(adminAuthMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.get('/problems', DeliveryProblemsController.index);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

export default routes;
