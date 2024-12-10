import express from 'express';
import * as BlogController from '../app/controllers/blogController.js';
import * as messageController from '../app/controllers/messageController.js';
import * as ServiceController from '../app/controllers/serviceController.js';
import * as TeamController from '../app/controllers/teamController.js';
import * as UserController from '../app/controllers/userController.js';

import AuthMiddleware from '../app/middlewares/authMiddleware.js';
import { upload } from '../app/utilities/multerConfig.js';

const router = express.Router();



/// User routes
router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.get('/logOut', AuthMiddleware, UserController.LogOut);
//
/// Blog routes
router.post(
  '/CreateBlog',
  AuthMiddleware,
  upload.single('image'),
  BlogController.saveBlog
);
router.get('/ReadBlog/:blogID', BlogController.readBlog);
router.post(
  '/UpdateBlog/:blogID',
  AuthMiddleware,
  upload.single('image'),
  BlogController.saveBlog
);
router.get('/DeleteBlog/:blogID', AuthMiddleware, BlogController.deleteBlog);
router.get('/BlogList', BlogController.blogList);



// Service routes
router.post(
    '/CreateService',
    AuthMiddleware,
    upload.single('image'),
    ServiceController.saveService
);
router.post(
    '/UpdateService/:serviceID',
    AuthMiddleware,
    upload.single('image'),
    ServiceController.saveService
);
router.get(
    '/ReadService/:serviceID',
    ServiceController.readService
);
router.get(
    '/DeleteService/:serviceID',
    AuthMiddleware,
    ServiceController.deleteService
);
router.get('/ServiceList', ServiceController.serviceList);



/// Team Routes

router.post('/CreateTeam', AuthMiddleware, upload.single('image'), TeamController.saveTeam);
router.get('/ReadTeam/:teamID', TeamController.readTeam);
router.post('/UpdateTeam/:teamID', AuthMiddleware, upload.single('image'), TeamController.saveTeam);
router.get('/DeleteTeam/:teamID', AuthMiddleware, TeamController.deleteTeam);
router.get('/TeamList', TeamController.teamList);




router.post('/SendMessage', messageController.sendMessage);

export default router;
