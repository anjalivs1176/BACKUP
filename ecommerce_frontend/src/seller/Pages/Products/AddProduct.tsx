import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Alert, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { uploadToCloudinary } from '../../../Util/uploadToCloudinary'
import { menLevelTwo } from '../../../data/category/level2/menLevelTwo'
import { womenLevelTwo } from '../../../data/category/level2/womenLevelTwo'
import { furnitureLevelTwo } from '../../../data/category/level2/furnitureLevelTwo'
import { electronicsLevelTwo } from '../../../data/category/level2/electroniscLevelTwo'
import { menLevelThree } from '../../../data/category/level3/menLevelThree'
import { womenLevelThree } from '../../../data/category/level3/womenLevelThree'
import { furnitureLevelThree } from '../../../data/category/level3/furnitureLevelThree'
import { electronicsLevelThree } from '../../../data/category/level3/electronicsLevelThree'
import { colors } from '../../../data/Filter/color'
import { mainCategory } from '../../../data/category/mainCategory'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../../state/store'
import { createProduct } from '../../../state/seller/sellerProductSlice'

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};


const AddProduct = () => {

  const [uploadImage, setUploadingImage] = useState(false);;

  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const dispatch = useAppDispatch();

const formik = useFormik({
  initialValues: {
    title: "",
    description: "",
    mrp_price: "",
    sellingPrice: "",
    quantity: "",
    colors: "",
    image: [],
    category: "",
    categoryTwo: "",
    categoryThree: "",
    sizes: "",
  },
  onSubmit: (values: any) => {
    console.log(values);
    // dispatch(createProduct({request:values,jwt: localStorage.getItem("jwt")}))

    const payload = {
      title: values.title,
      description: values.description,
      mrpPrice: Number(values.mrp_price),
      sellingPrice: Number(values.sellingPrice),
      color: values.colors,
      images: values.image,               
      category: values.category,
      category2: values.categoryTwo,
      category3: values.categoryThree,
      size: values.sizes,
    };

    dispatch(createProduct({ request: payload, jwt: localStorage.getItem("jwt") }));
  }
});


  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("image", [...formik.values.image, image]);
    setUploadingImage(false);
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.image];
    updatedImages.splice(index, 1);
    formik.setFieldValue("image", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      // console.log("category",parentCategoryId,child);
      return child.parentCategoryId == parentCategoryId;
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];


  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type='file'
              accept='image/'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label className='relative' htmlFor='fileInput'>
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                <AddPhotoAlternate className='text-gray-700' />
              </span>
              {uploadImage && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress />

                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.image.map((image: any, index: any) => (
                <div className="relative" key={index}>
                  <img
                    className='w-24 h-24 object-cover'
                    src={image}
                    alt={`productImage ${index + 1}`}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className=''
                    size='small'
                    color='error'
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name='title'
              label='Title'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              // helperText={formik.touched.title ? formik.errors.title : ""}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name='description'
              label='Discription'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              //helperText={formik.touched.description &&  formik.errors.description}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id="mrp_price"
              name='mrp_price'
              label='MRP Price'
              type='number'
              value={formik.values.mrp_price}
              onChange={formik.handleChange}
              error={formik.touched.mrp_price && Boolean(formik.errors.mrp_price)}
              // helperText={formik.touched.mrp_price ? formik.errors.mrp_price : ""}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name='sellingPrice'
              label='Selling Price'
              type='number'
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              // helperText={formik.touched.sellingPrice ? formik.errors.sellingPrice : ""}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.colors && Boolean(formik.errors.colors)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="colors"
                name="colors"
                value={formik.values.colors}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((color: any, index: number) => (
                  <MenuItem key={index} value={color.name}>
                    <div className="flex gap-3 items-center">
                      <span
                        style={{ backgroundColor: color.hex }}
                        className={`h-5 w-5 rounded-full ${color.name === "white" ? "border" : ""}`}
                      />
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.colors && typeof formik.errors.colors === "string" && (
                <FormHelperText>{formik.errors.colors}</FormHelperText>
              )}

            </FormControl>

          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Size</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Size"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {sizeOptions.map((size, index) => (
                  <MenuItem key={index} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.sizes && typeof formik.errors.sizes === "string" && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>

              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Category"
              >
                {mainCategory.map((item, index) => (
                  <MenuItem key={index} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.category && typeof formik.errors.category === "string" && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.categoryTwo && Boolean(formik.errors.categoryTwo)}
              required
              disabled={!formik.values.category} // only logic change
            >
              <InputLabel id="categoryTwo-label">Sub Category</InputLabel>

              <Select
                labelId="categoryTwo-label"
                id="categoryTwo"
                name="categoryTwo"
                value={formik.values.categoryTwo}
                onChange={formik.handleChange}
                label="Sub Category"
              >
                {(categoryTwo[formik.values.category] || []).map((item, index) => (
                  <MenuItem key={index} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.categoryTwo && typeof formik.errors.categoryTwo === "string" && (
                <FormHelperText>{formik.errors.categoryTwo}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.categoryThree && Boolean(formik.errors.categoryThree)}
              required
              disabled={!formik.values.categoryTwo} // only logic change
            >
              <InputLabel id="categoryThree-label">Sub Sub Category</InputLabel>

              <Select
                labelId="categoryThree-label"
                id="categoryThree"
                name="categoryThree"
                value={formik.values.categoryThree}
                onChange={formik.handleChange}
                label="Sub Sub Category"
              >
                {(categoryThree[formik.values.category] || []).filter(
                  item => item.parentCategoryId === formik.values.categoryTwo
                ).map((item, index) => (
                  <MenuItem key={index} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.categoryThree && typeof formik.errors.categoryThree === "string" && (
                <FormHelperText>{formik.errors.categoryThree}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            // disabled={sellerProduct.loading}
            >
              {false ? <CircularProgress size="small" color="inherit" /> : "Add Product"}
            </Button>
          </Grid>
        </Grid>
        {/* <Snackbar
        anchorOrigin={{vertical:"top",horizontal:"right"}}
        open={snackbarOpen} autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        >
          <Alert
          onClose={handleCloseSnackbar}
          severity={true ? "error" : "success"}
          variant='filled'
          sx={{width:'100%'}}
          >
            {sellerProduct.error ? sellerProduct.error : "Product Created Successfully"}
          </Alert>
        </Snackbar> */}
      </form>
    </div>
  )
}

export default AddProduct