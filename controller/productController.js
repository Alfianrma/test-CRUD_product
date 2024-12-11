import Product from "../db/model/product.js";

const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      userId: req.user.id,
    });
    res.status(201).json({ message: "Success add product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const updates = req.body;
  const product = await Product.findByPk(req.params.id);
  try {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.dataValues.userId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    await product.update(updates);
    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  try {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.dataValues.userId !== req.user.id) {
      return res.status(401).json({ message: "Unathorized!" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default { getProduct, addProduct, updateProduct, deleteProduct };
