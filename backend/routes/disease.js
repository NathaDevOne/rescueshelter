const express = require('express');
const router = express.Router();

const {getAdminDiseases,
	   newDisease,
	   getDiseaseDetails,
	   updateDisease,
	   deleteDisease} = require('../controllers/diseaseController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/disease/new').post(isAuthenticatedUser, authorizeRoles('Admin','Employee'),newDisease);
router.route('/admin/diseases').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getAdminDiseases);
router.route('/admin/disease/:id').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getDiseaseDetails).put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), updateDisease).delete(isAuthenticatedUser, authorizeRoles('Admin','Employee'), deleteDisease);

module.exports = router;