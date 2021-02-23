import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

//@ desc Fetch all products
//@route get /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  try{
    const pageSize = 2;
  const page = Number(req.query.pageNumber)||1
  const keyword = req.query.keyword?{
    name:{
      $regex: req.query.keyword,
      $options: 'i'
    }
  }: {}

  const count = await Product.countDocuments({...keyword})
  
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
  res.json({products,page,pages: Math.ceil(count/pageSize)});}
  catch(error){
    console.log(error)
    res.status(404);
  }
});

//@ desc Fetch a product
//@route get /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.find({ _id: req.params.id.toString() });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
    throw new Error("product not found");
  }
});
const createNewProduct = asyncHandler(async (req, res) => {
  //console.log(req.user._id)
  const NewProduct = await Product.create({
    user: "60035f2828af8145bcf0043b",
    name: "sample name",
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample catagory",
    description: "Sample description",
  });
  console.log(NewProduct);
  res.send(NewProduct);
  // console.log(createNewProduct)
  //const saveProduct =await NewProduct.create();
});
const UpdateProduct = asyncHandler(async (req, res) => {
  //console.log(req.user._id)
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
  } = req.body;
  console.log(image);
  const product = await Product.findById(req.params.id);

  if (product) {
    product.user = req.user;
    product.name = name || product.name;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    await product.save();
    res.send("Product Saved");
  } else {
    throw new Error("Product Not Found");
    res.status(404).send("Error");
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const productRemove = await Product.findById(req.params.id);
  console.log(req.params);
  console.log(productRemove._id);
  if (productRemove) {
    let dat;

    await Product.deleteOne({ _id: productRemove._id }, (err, data) => {
      if (err) throw new Error(err);
      dat = data;
    });

    console.log(dat);
    res.send({ message: "delete success" });
  } else {
    throw new Error("Product Not Found!");
    res.status(404).send({ error: error });
  }
});

//post request
const createNewReview = asyncHandler(async (req, res) => {
  //console.log(req.user._id)
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  console.log(product)
  
  if (product) {
     const allReadyReviewed = product.reviews.find((r) => {
       return r.user.toString() === req.user._id.toString();
     });
     if (allReadyReviewed) {
       res.status(400);
       throw new Error("product already reviewed by user");
     }
     const review = {
       name: req.user.name,
       rating: Number(rating),
       comment: comment,
       user: req.user._id,
     };
     product.reviews.push(review);
     product.numReviews = product.reviews.length;
     product.rating =
       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
       product.reviews.length;
     await product.save();
     res.status(201).json({ message: "review added" });
  
  } else {
    throw new Error("Product Not Found");
    res.status(404).send("Error");
  }
  
  
});
const getTopProducts = asyncHandler(async (req, res) => {
  //console.log(req.user._id)
 try{
   const topProducts = await Product.find({}).sort({review: -1}).limit(3)
   res.json(topProducts);
 }
 catch (error){
   console.log(error)
   res.status(404).send(error)
 }
  
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createNewProduct,
  UpdateProduct,
  createNewReview,
  getTopProducts,
};
