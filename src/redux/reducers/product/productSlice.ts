
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import productService from "./productService"
import { toast } from "react-toastify";
import { Filters } from "../../../static/staticData";


export interface IProductState {
    _id?: string;
    title: string;
    slug?: string;
    description: string;
    price: number;
    category: any;
    brand: any;
    tags: string[];
    quantity: number;
    sold: number;
    images: Array<any>;
    color: any[];
    seller?: any;
    ratings?: any[];
    totalRating?: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export const getAllProducts = createAsyncThunk('productSlice/getAllProducts', async (data: Filters, thunkAPI) => {
    try {
        const prod = await productService.getProducts(data)
        return prod
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const getSingleProduct = createAsyncThunk('productSlice/getSingleProduct', async (id: string, thunkAPI) => {
    try {
        const prod = await productService.getProduct(id)
        return prod
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const addToWishlist = createAsyncThunk('productSlice/addToWishlist', async (prodId: string, thunkAPI) => {
    try {
        const wishlist = await productService.Wishlist(prodId)
        return wishlist
    } catch (error: any) {
        console.log(error);

        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const getAllWishlist = createAsyncThunk('productSlice/getAllWishlist', async (_, thunkAPI) => {
    try {
        const wishlist = await productService.GetWishlist()
        return wishlist
    } catch (error: any) {
        console.log(error);

        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const createReview = createAsyncThunk('productSlice/createReview', async (data: any, thunkAPI) => {
    try {
        const review = await productService.review({ star: data?.rating, prodId: data?.prodId, comment: data?.comment, title: data?.title })
        return review
    } catch (error: any) {
        console.log(error);

        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const deleteReview = createAsyncThunk('productSlice/deleteReview', async (id: string, thunkAPI) => {
    try {
        const review = await productService.deletereview(id)
        return review
    } catch (error: any) {
        console.log(error);

        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})


interface ProductState {
    products: IProductState[];
    wishlist: IProductState[];
    singleProduct: IProductState | null;
    isError: boolean;
    isLoading: boolean;
    wishlistLoading: boolean;
    isSuccess: boolean;
    message: string;
    modal: boolean;
    handleWishlist: boolean;
    isReviewAdded: boolean;
}

const initialState: ProductState = {
    products: [],
    wishlist: [],
    singleProduct: null,
    isError: false,
    isLoading: false,
    wishlistLoading: false,
    isSuccess: false,
    message: "",
    modal: false,
    handleWishlist: false,
    isReviewAdded: false
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.handleWishlist = action.payload
        },
        handleReview: (state, action) => {
            state.isReviewAdded = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.products = action.payload
        }).addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(getSingleProduct.pending, (state) => {
            state.isLoading = true
        }).addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.singleProduct = action.payload
        }).addCase(getSingleProduct.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(addToWishlist.pending, (state) => {
            state.wishlistLoading = true
        }).addCase(addToWishlist.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.wishlist = action.payload?.wishlist
        }).addCase(addToWishlist.rejected, (state, action: PayloadAction<any>) => {
            state.wishlistLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(getAllWishlist.pending, (state) => {
            state.wishlistLoading = true
        }).addCase(getAllWishlist.fulfilled, (state, action: PayloadAction<any>) => {
            state.wishlistLoading = false
            state.isSuccess = true
            state.isError = false
            state.wishlist = action.payload?.wishlist
        }).addCase(getAllWishlist.rejected, (state, action: PayloadAction<any>) => {
            state.wishlistLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(createReview.pending, (state) => {
            state.isLoading = true
        }).addCase(createReview.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("product reviewed sucessfully", {
                position: 'top-right'
            })
        }).addCase(createReview.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })

    }
})


export const { setWishlist, handleReview } = productSlice.actions
export default productSlice.reducer
