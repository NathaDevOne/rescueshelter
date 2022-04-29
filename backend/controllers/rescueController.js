const Rescue = require('../models/rescue')
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary').v2;
const Filter = require('bad-words')

exports.newRescue = async (req, res, next) => {
    const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'rescues',
        width: 150,
        crop: "scale"
    })

    let healths = []
    if (typeof req.body.diseases === 'string') {
        healths.push(req.body.diseases)
    } else {
        healths = req.body.diseases
    }

    let newHealth = [];

    for (let i = 0; i < healths.length; i++) {
        const disease = healths[i];
        newHealth.push({
            disease
        })
    }

    let healthss = []
    if (typeof req.body.injuries === 'string') {
        healthss.push(req.body.injuries)
    } else {
        healthss = req.body.injuries
    }

    let newHealths = [];

    for (let i = 0; i < healthss.length; i++) {
        const injury = healthss[i];
        newHealths.push({
            injury
        })
    }

    console.log(healths);
    console.log(newHealth);

    const newRescueData = {
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        gender: req.body.gender,
        age: req.body.age,
        diseases: newHealth,
        injuries: newHealths,
        // name: newHealth,
        image: {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const rescue = await Rescue.create(newRescueData);

    res.status(200).json({
        success: true,
        rescue
    })
};

exports.getAdminRescues = catchAsyncErrors(async (req, res, next) => {

    const rescues = await Rescue.find();

    res.status(200).json({
        success: true,
        rescues
    })

})

exports.getRescues = async (req,res,next) => {
	const resPerPage = 4;
	const rescuesCount = await Rescue.countDocuments();
	const apiFeatures = new APIFeatures(Rescue.find({condition:'Treated'}),req.query).search().filter();
	apiFeatures.pagination(resPerPage);
	const rescues = await apiFeatures.query;
	let filteredRescuesCount = rescues.length;
	res.status(200).json({
		success: true,
		rescuesCount,
		resPerPage,
		filteredRescuesCount,
		rescues
	})
}

exports.getSingleRescue = async(req,res,next) => {
	const rescue = await Rescue.findById(req.params.id);
	if(!rescue) {
		return next(new ErrorHandler('Rescue not found',404));
	}
	res.status(200).json({
		success: true,
		rescue
	})
}

exports.updateRescue = async (req, res, next) => {
    let rescue = await Rescue.findById(req.params.id);

    let healths = []
    if (typeof req.body.diseases === 'string') {
        healths.push(req.body.diseases)
    } else {
        healths = req.body.diseases
    }

    let newHealth = [];

    for (let i = 0; i < healths.length; i++) {
        const disease = healths[i];
        newHealth.push({
            disease
        })
    }

    let healthss = []
    if (typeof req.body.injuries === 'string') {
        healthss.push(req.body.injuries)
    } else {
        healthss = req.body.injuries
    }

    let newHealths = [];

    for (let i = 0; i < healthss.length; i++) {
        const injury = healthss[i];
        newHealths.push({
            injury
        })
    }

    const newRescueData = {
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        gender: req.body.gender,
        age: req.body.age,
        diseases: newHealth,
        injuries: newHealths,
    }

    if (req.body.image !== '') {
        // const rescue = await Rescue.findById(req.rescue.id)

        const image_id = rescue.image.public_id;
        const res = await cloudinary.uploader.destroy(image_id);
        
        const result = await cloudinary.uploader.upload(req.body.image, {
            folder: 'rescues',
            width: 150,
            crop: "scale"
        })
        newRescueData.image = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    // console.log(newRescueData.image)

    rescue = await Rescue.findByIdAndUpdate(req.params.id, newRescueData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true
    })
}

exports.getRescueDetails = async (req, res, next) => {
    const rescue = await Rescue.findById(req.params.id);
    if (!rescue) {
        return next(new ErrorHandler(`Rescue does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        rescue
    })
}

exports.deleteRescue = catchAsyncErrors(async (req, res, next) => {
    const rescue = await Rescue.findById(req.params.id);

    if (!rescue) {
        return next(new ErrorHandler(`Rescue does not found with id: ${req.params.id}`))
    }

    await rescue.remove();

    res.status(200).json({
        success: true,
        message: 'Rescue deleted'
    })
})

exports.createRescueComment = catchAsyncErrors(async (req, res, next) => {
    
    const filter = new Filter();
    var text = filter.clean(req.body.text);

    const { rescueId } = req.body;
    const comment = {
        user: req.user._id,
        name: req.user.name,
        text
    }
    const rescue = await Rescue.findById(rescueId);
    const isCommented = rescue.comments.find(
        c => c.user.toString() === req.user._id.toString()
    )
    if (isCommented) {
        rescue.comments.forEach(comment => {
            if (comment.user.toString() === req.user._id.toString()) {
                comment.text = text;
            }
        })
    } else {
        rescue.comments.push(comment);
    }

    await rescue.save({ validateBeforeSave: false });
    
    res.status(200).json({
        success: true
    })
})

// Get Rescue Comments   =>   /api/v1/comments
exports.getRescueComments = catchAsyncErrors(async (req, res, next) => {
    const rescue = await Rescue.findById(req.query.id);
    res.status(200).json({
        success: true,
        comments: rescue.comments
    })
})

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const rescue = await Rescue.findById(req.query.rescueId);
    console.log(rescue);
    const comments = rescue.comments.filter(comment => comment._id.toString() !== req.query.id.toString());
    await Rescue.findByIdAndUpdate(req.query.rescueId, {
        comments
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

exports.requestAdopt = async (req, res, next) => {
    let rescue = await Rescue.findById(req.params.id)
    const newRescueData = {
        condition: "Requested",
        request : req.user._id,
    }
    rescue = await Rescue.findByIdAndUpdate(req.params.id, newRescueData, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({
        success: true
    })
}

exports.getAdminRequests = catchAsyncErrors(async (req, res, next) => {

    const requests = await Rescue.find({condition:['Requested']}).populate({
        path: 'request',
        select: ['name','email']});

    res.status(200).json({
        success: true,
        requests
    })

})

exports.approveRequest = async (req, res, next) => {
    let rescue = await Rescue.findById(req.params.id)
    const requestDate = Date();
    const myrequest = rescue.request;
    const newRescueData = {
        condition: "Adopted",
        adopter: myrequest,
        adoptedAt: requestDate,
        request: null,
    }
    rescue = await Rescue.findByIdAndUpdate(req.params.id, newRescueData, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({
        success: true
    })
}

exports.denyRequest = async (req, res, next) => {
    let rescue = await Rescue.findById(req.params.id)
    // const requestDate = Date();
    const myrequest = rescue.request;
    const newRescueData = {
        condition: "Treated",
        request: null,
        dateadopted: null,
    }
    rescue = await Rescue.findByIdAndUpdate(req.params.id, newRescueData, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({
        success: true
    })
}

exports.myAdopteds = async (req, res, next) => {
    const rescues = await Rescue.find({adopter: req.user.id})
    console.log(rescues);
    res.status(200).json({
        success: true,
        rescues
    })
}

exports.treatRescue = async (req, res, next) => {
    let rescue = await Rescue.findById(req.params.id)
    // const myrequest = rescue.request;
    const newRescueData = {
        condition: "Treated",
        diseases: null,
        injuries: null,
    }
    rescue = await Rescue.findByIdAndUpdate(req.params.id, newRescueData, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({
        success: true
    })
}

exports.getRescuedChart = async(req,res,next) => {
    const animalsrescued = await Rescue.find({}).select(['createdAt']);
    res.status(200).json({
        success:true,
        animalsrescued
    })
}

exports.getAdoptedChart = async(req,res,next) => {
    const animalsadopted = await Rescue.find({condition:['Adopted']}).select(['adoptedAt']);
    res.status(200).json({
        success:true,
        animalsadopted
    })
}
