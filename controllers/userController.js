const notImplemented = {
  status: 'error',
  message: 'This route is not implemented yet!',
};

const getAllUsers = (req, res) => {
  res.status(500).json(notImplemented);
};
const createUser = (req, res) => {
  res.status(500).json(notImplemented);
};
const getUser = (req, res) => {
  res.status(500).json(notImplemented);
};
const updateUser = (req, res) => {
  res.status(500).json(notImplemented);
};
const deleteUser = (req, res) => {
  res.status(500).json(notImplemented);
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
