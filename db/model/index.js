import dbconnect from "../db.js";
import User from "./user.js";
import Product from "./product.js";

User.hasMany(Product, {
  foreignKey: {
    name: "userId",
  },
});

Product.belongsTo(User, {
  foreignKey: {
    name: "userId",
  },
});

export default { User, Product, dbconnect };
