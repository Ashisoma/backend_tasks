const express = require('express');
const app = express();
const xss = require('xss-clean');
const apiRouting = require("./src/routes/routing");