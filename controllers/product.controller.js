const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    //{price:{$ gt:50}
    //{ price: { gt: '50' } }
    console.log(req.query);

    let filters = { ...req.query };

    //sort , page , limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,quantity -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query; // "3" '10'
      // 50 products
      // each page 10 product
      // page1-->1- 1-10
      // page2-->2- 11-20
      // page3-->3- 21-30  --> page 3 --> skip 1-20 -> 3-1 -> 2 * 10
      // page4-->4- 31-40  --> page 4 --> skip 1-30 -> 4-1 -> 3 * 10
      // page5-->5- 41-50

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductService(filters, queries);

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

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully updated the product.",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully updated the product.",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted the product.",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted the given products.",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't delete the given product",
      error: error.message,
    });
  }
};
