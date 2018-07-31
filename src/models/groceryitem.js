const groceryItem = (sequelize, DataTypes) => {
  const GroceryItem = sequelize.define('GroceryItem', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
  }, {
    underscoredAll: true
  });

  GroceryItem.associate = (models) => {
    GroceryItem.belongsTo(models.Product, {
      as: 'product'
    });
    GroceryItem.belongsTo(models.Brand, {
      as: 'brand'
    });
  };

  return GroceryItem;
};

export default groceryItem;