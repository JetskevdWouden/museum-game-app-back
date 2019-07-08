const {Router} = require('express');
const Sse = require('json-sse');
const Game = require('./model');
const User = require('../user/model');

const router = new Router();

