const {
  getProductService,
  createProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gt(100)
    //   .lt(600)
    //   .limit(2)
    //   .sort({ quantity: -1 });

    const products = await getProductService(req.query.limit);

    res.status(200).json({
      status: "success",
      // data: products,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "can't get data",
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // save or create

    const result = await createProductService(req.body);

    result.logger();

    res.status(200).json({
      status: "Success",
      message: "Data insered successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};
