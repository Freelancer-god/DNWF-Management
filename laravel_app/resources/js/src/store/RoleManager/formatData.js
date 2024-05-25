export const formatGetIDBFSubmit = (data) => {
  const newArray = [];
  for (const i of data) {
    newArray.push(i.id);
  }
  return newArray;
};

export const formatGetIDAndTitleBFSubmit = (data) => {
  const newArray = [];
  for (const i of data) {
    newArray.push({ id: i.id, title: i.title || i.name });
  }
  return newArray;
};
