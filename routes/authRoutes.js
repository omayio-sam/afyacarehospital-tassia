const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authControllers');

// Route for the signup page (GET)

router.get('/home', authController.home_get);

router.get('/services', authController.services_get);

router.get('/news', authController.news_get);

router.get('/about', authController.about_get);

router.get('/nurses', authController.nurses_get);

router.get('/docs', authController.docs_get);

router.get('/clinic', authController.clinic_get);

router.get('/appoint', authController.appoint_get);

router.get('/appoint', authController.appoint_get);

router.get('/signup', authController.signup_get);

router.get('/login', authController.login_get);

// Route to handle login form submission (POST)
router.post('/login', authController.login_post);
// Route to handle signup form submission (POST)
router.post('/signup', authController.signup_post);

module.exports = router; // Ensure to export the router
