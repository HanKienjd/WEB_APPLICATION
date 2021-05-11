/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const { Model } = require('objection');
const cors = require('cors');

dotenv.config({ path: '.env' });

const routes = require('./app/routes');
const knex = require('./database/knex');
const {
  auth, checkProject,
} = require('./app/http/middlewares');

Model.knex(knex);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/projects', auth);
app.use('/api/roles', auth);
app.use('/api/users', auth);
app.use('/api/departments', auth);
app.use('/api/time-offs', auth);
app.use('/api/overtimes', auth);
app.use('/api/projects/:projectId([0-9]+)', checkProject);
app.use('/api/policies', auth);
app.use('/api/deliverables', auth);
app.use('/api/positions', auth);
app.use('/api/work-orders', auth);
app.use('/api/dashboards', auth);
app.use('/api/attendances', auth);
app.use('/api/vacations', auth);
app.use('/api/attendance-reports', auth);
app.use('/api/holidays', auth);
app.use('/api/suggests', auth);
app.use('/api/skills', auth);
app.use('/api/sources', auth);
app.use('/api/applicants', auth);
app.use('/api/jobs', auth);

Object.keys(routes).map((route) => app.use('/api', routes[route]));

app.use((req, res) => {
  res.status(404).send('Api not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
