const getAll = () => {
  return "getAll";
};

const createOne = (exampleCreated: { name: string; description: string }) => {
  return exampleCreated;
};

const updateOne = (exampleUpdated: { name?: string; description?: string }) => {
  return exampleUpdated;
};

const deleteOne = () => {
  return "deleteOne";
};

export default {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
