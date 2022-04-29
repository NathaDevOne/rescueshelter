// const Disease = require('../models/disease');
// const Injury = require('../models/injury');
// const User = require('../models/user');
const Rescue = require('../models/rescue');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

// const diseases = require('../data/diseases');
// const injuries = require('../data/injuries');
// const users = require('../data/users');
const rescues = require('../data/rescues');

dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

// const seedDiseases = async () => {
//     try {

//         await Disease.deleteMany();
//         console.log('Diseases are deleted');

//         await Disease.insertMany(diseases)
//         console.log('All Diseases are added.')

//         process.exit();

//     } catch (error) {
//         console.log(error.message);
//         process.exit();
//     }
// }

// seedDiseases()

// const seedInjuries = async () => {
//     try {

//         await Injury.deleteMany();
//         console.log('Injuries are deleted');

//         await Injury.insertMany(injuries)
//         console.log('All Injuries are added.')

//         process.exit();

//     } catch (error) {
//         console.log(error.message);
//         process.exit();
//     }
// }

// seedInjuries()

// const seedUsers = async () => {
//     try {

//         await User.deleteMany();
//         console.log('Users are deleted');

//         await User.insertMany(users)
//         console.log('All Users are added.')

//         process.exit();

//     } catch (error) {
//         console.log(error.message);
//         process.exit();
//     }
// }

const seedRescues = async () => {
    try {

        await Rescue.deleteMany();
        console.log('Rescues are deleted');

        await Rescue.insertMany(rescues)
        console.log('All Rescues are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedRescues()