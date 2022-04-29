const express = require('express');
const router = express.Router();

const {getAdminInjuries,
	   newInjury,
	   getInjuryDetails,
	   updateInjury,
	   deleteInjury} = require('../controllers/injuryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/injury/new').post(isAuthenticatedUser, authorizeRoles('Admin','Employee'), newInjury);
router.route('/admin/injuries').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getAdminInjuries);
router.route('/admin/injury/:id').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getInjuryDetails).put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), updateInjury).delete(isAuthenticatedUser, authorizeRoles('Admin','Employee'), deleteInjury);


module.exports = router;