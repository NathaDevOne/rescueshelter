const express = require('express');
const router = express.Router();

const { registerUser,
		newUser,
		allUsers,
		allAdopters,
		loginUser,
		forgotPassword,
		resetPassword,
		getUserProfile,
		updatePassword,
		updateProfile,
		getUserDetails,
		updateUser,
		activateAdopter,
		deleteUser,
		logout 
	} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/admin/user/new').post(isAuthenticatedUser,authorizeRoles('Admin','Employee'), newUser);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), allUsers);
router.route('/admin/adopters').get(isAuthenticatedUser, authorizeRoles('Admin', 'Employee'), allAdopters);


router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getUserDetails).put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), updateUser).delete(isAuthenticatedUser, authorizeRoles('Admin','Employee'), deleteUser);

router.route('/admin/adopter/:id').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getUserDetails).put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), activateAdopter).delete(isAuthenticatedUser, authorizeRoles('Admin','Employee'), deleteUser);

router.route('/logout').get(logout);

module.exports = router;