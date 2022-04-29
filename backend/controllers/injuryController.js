const Injury = require('../models/injury')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new injury
exports.newInjury = async(req,res,next) => {
	console.log(req.body);
	const injury = await Injury.create(req.body);
	res.status(201).json({
		success:true,
		injury 
	})
}

exports.getAdminInjuries = catchAsyncErrors(async (req, res, next) => {

    const injuries = await Injury.find();

    res.status(200).json({
        success: true,
        injuries
    })

})

exports.getInjuryDetails = async (req, res, next) => {
    const injury = await Injury.findById(req.params.id);
    if (!injury) {
        return next(new ErrorHandler(`Injury does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        injury
    })
}
exports.updateInjury = catchAsyncErrors(async (req, res, next) => {
    const newInjuryData = {
        name: req.body.name
    }

    const injury = await Injury.findByIdAndUpdate(req.params.id, newInjuryData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true
    })
})

exports.deleteInjury = catchAsyncErrors(async (req, res, next) => {
    const injury = await Injury.findById(req.params.id);

    if (!injury) {
        return next(new ErrorHandler(`Injury does not found with id: ${req.params.id}`))
    }

    await injury.remove();

    res.status(200).json({
        success: true,
    })
})