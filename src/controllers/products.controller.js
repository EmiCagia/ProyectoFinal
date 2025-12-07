import * as productsService from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener todos los productos",
      error: err.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productsService.getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener todos los productos",
      error: err.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productsService.createProduct(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json({
      message: "Error al crear un nuevo producto",
      error: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productdeleted = await productsService.deleteProduct(id);
    if (productdeleted) {
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } else {
      res
        .status(404)
        .json({ message: "No se encontró el producot a eliminar" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error al eliminar el producto", error: err.message });
  }
};
