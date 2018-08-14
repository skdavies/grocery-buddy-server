import Sequelize from 'sequelize';

export const genericUpdateSuccessResponse = (data, res) => {
  if (data[0] && data[0][1]) {
    res.json(data[0][1]);
  } else {
    res.sendStatus(200);
  }
};

export const genericErrorResponse = (error, res) => {
  if (error.name === 'SequelizeValidationError') {
    res.status(400).send(error.message);
  } else {
    res.sendStatus(500);
  }
};

export const sequelizeErrorHandler = (err, req, res, next) => {
  console.log(err);
  // TODO ONE DAY THESE SHOULD BE LOGGED IN SOME WAY OTHER THAN CONSOLE
  if (err instanceof Sequelize.ValidationError) {
    res.status(400).send(err.message);
  } else if (err instanceof Sequelize.DatabaseError) {
    res.status(400).send(err.message);
  } else {
    res.sendStatus(500);
  }
};