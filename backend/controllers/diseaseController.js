const Disease = require('../models/disease')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new disease
exports.newDisease = async(req,res,next) => {
	console.log(req.body);
	const disease = await Disease.create(req.body);
	res.status(201).json({
		success:true,
		disease 
	})
}

exports.getAdminDiseases = catchAsyncErrors(async (req, res, next) => {

    const diseases = await Disease.find();

    res.status(200).json({
        success: true,
        diseases
    })

})

exports.getDiseaseDetails = async (req, res, next) => {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
        return next(new ErrorHandler(`Disease does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        disease
    })
}

exports.updateDisease = catchAsyncErrors(async (req, res, next) => {
    const newDiseaseData = {
        name: req.body.name
    }

    const disease = await Disease.findByIdAndUpdate(req.params.id, newDiseaseData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true
    })
})

exports.deleteDisease = catchAsyncErrors(async (req, res, next) => {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
        return next(new ErrorHandler(`Disease does not found with id: ${req.params.id}`))
    }

    await disease.remove();

    res.status(200).json({
        success: true,
    })
})