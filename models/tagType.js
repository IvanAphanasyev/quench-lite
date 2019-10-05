module.exports = (sequelize, dataTypes) => {
  const type = sequelize.define("tagType", {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV1,
      primaryKey: true
    },
    value: {
      type: dataTypes.STRING,
      allowNull: false
    }
  });
  return type;
};
