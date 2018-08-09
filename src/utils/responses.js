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