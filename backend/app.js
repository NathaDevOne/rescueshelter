const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const diseases = require('./routes/disease');
const injuries = require('./routes/injury');
const rescues = require('./routes/rescue');
const auth = require('./routes/auth');

app.use('/api/v1', diseases);
app.use('/api/v1', injuries);
app.use('/api/v1', rescues);
app.use('/api/v1', auth);

if (process.env.NODE_ENV !== 'PRODUCTION')
	require('dotenv').config({ path: 'backend/config/config.env' })

	if (process.env.NODE_ENV === 'PRODUCTION') {
		app.use(express.static(path.join(__dirname, '../frontend/build')))

		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
		})
	}

app.use(errorMiddleware);

module.exports = app