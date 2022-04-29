const express = require('express');
const router = express.Router();

const { getRescues,
		// getAdoptableRescues,
		getAdminRescues,
	   	newRescue,
	   	getSingleRescue,
	   	deleteRescue,
	   	updateRescue,
	   	getRescueDetails,
	   	createRescueComment,
	   	getRescueComments,
	   	deleteComment,
	   	requestAdopt,
	   	getAdminRequests,
	   	approveRequest,
	   	denyRequest,
	   	treatRescue,
	   	getRescuedChart,
	   	getAdoptedChart,
	   	myAdopteds
	   	} = require('../controllers/rescueController');

const { isAuthenticatedUser, authorizeRoles, isActiveUsers } = require('../middlewares/auth')

router.route('/rescues').get(getRescues);
// router.route('/adoptables').get(isAuthenticatedUser, getAdoptableRescues);
// router.route('/adoptables').get(isAuthenticatedUser, authorizeRoles('Adopter'), isActiveUsers('Active'),getAdoptableRescues);
// router.route('/rescue/new').post(isAuthenticatedUser, newRescue);
router.route('/admin/rescue/new').post(isAuthenticatedUser,authorizeRoles('Admin','Employee'), newRescue);
router.route('/rescue/:id').get(getSingleRescue);

router.route('/admin/rescues').get(getAdminRescues);
// router.route('/admin/rescue/:id').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getRescueDetails).put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), updateRescue);
// router.route('/admin/rescues').get(isAuthenticatedUser, authorizeRoles('Admin', 'Employee'), getAdminRescues);
// router.route('/admin/rescue/:id').put(updateRescue).delete(deleteRescue);
router.route('/admin/rescue/:id').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getRescueDetails).put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), updateRescue).delete(isAuthenticatedUser, authorizeRoles('Admin','Employee'), deleteRescue);

router.route('/comment').put(isAuthenticatedUser, createRescueComment);
router.route('/comments').get(isAuthenticatedUser, getRescueComments);
router.route('/comments').delete(isAuthenticatedUser, deleteComment);

router.route('/adopt/:id').put(isAuthenticatedUser, requestAdopt);
router.route('/admin/requests').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getAdminRequests);
router.route('/admin/approve/:id').put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), approveRequest);
router.route('/admin/deny/:id').put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), denyRequest);
router.route('/adopteds').get(isAuthenticatedUser, myAdopteds);
router.route('/admin/treat/:id').put(isAuthenticatedUser, authorizeRoles('Admin','Employee'), treatRescue);
router.route('/admin/rescuedcharts').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getRescuedChart);
router.route('/admin/adoptedcharts').get(isAuthenticatedUser, authorizeRoles('Admin','Employee'), getAdoptedChart);
// router.route('/adopt').put(isAuthenticatedUser, authorizeRoles('Adopter'), newAdopt);

module.exports = router;