import React, { useState, useEffect, useLayoutEffect } from "react"
import LongCard from "../components/Cards/LongCard"
import { BsCartCheck } from "react-icons/bs"
import { GrCart } from "react-icons/gr"
import { BsBook, BsCartX } from "react-icons/bs"
import { AiFillCaretDown, AiOutlineAppstore } from "react-icons/ai"
import { MdOutlineFlipCameraAndroid } from "react-icons/md"
import { Link, NavLink, useNavigate } from "react-router-dom"
import ProductCard from "../components/Cards/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { getAllWishlist } from "../redux/reducers/product/productSlice"

const Wishlist = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    const [closeMenu, setCloseMenu] = useState(true)
    const { wishlist } = useSelector((state: RootState) => state.product)
    const { user } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [Link]);
    useEffect(() => {
        dispatch(getAllWishlist())
    }, [])
    return (
        <>
            {
                wishlist.length === 0 ? (
                    <>
                        <div id="empty-wishlist" className="bg-skin-background" style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <div className="empty-wishlist" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div className="empty-wishlist-icon" style={{ zIndex: '-1', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(0, 0, 0, 0.1)', fontSize: '15rem', fontWeight: '530', fontFamily: 'poppins' }}>
                                    <BsCartX className="w-full h-screen opacity-50" />
                                </div>
                                <h2 className="text-skin-base text-[30px] sm:text-[50px]" style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'poppins' }}>Your Wishlist Is Empty</h2>
                                <NavLink className="hover:shadow-lg transition-all hover:scale-110" style={{ padding: '12px 15px', margin: '20px 20px', color: 'white', textDecoration: 'none', fontStyle: 'italic', fontFamily: 'poppins', background: 'linear-gradient(93.87deg, green, gray)', borderRadius: "8px" }}
                                    to="/products">Add products</NavLink>
                                <p className="text-skin-backgroundHover" style={{ fontStyle: 'italic', fontFamily: 'poppins', textAlign: 'center' }}>Add some items to your wishlist and come back soon!</p>
                            </div>
                        </div>
                    </>


                ) : (
                    <div className="bg-skin-background">
                        <h3 className="text-skin-base font-[550] text-[1.5rem] pt-2 hover:underline w-fit sm:hidden m-auto">My wishlist</h3>
                        <section className="rounded-md">
                            <div className="md:flex gap-5 sm:p-5 block">
                                <div className="md:w-3/12 md:block hidden">
                                    <div onClick={() => setCloseMenu(!closeMenu)} className='sm:hidden block py-5 hover:bg-slate-400 rounded-full mb-1'>
                                        <AiFillCaretDown title="toggle menu" className="float-right w-full text-skin-base" />
                                    </div>
                                    <div className="sticky top-32">
                                        {
                                            closeMenu === true ? (
                                                <div className="bg-white rounded-lg py-[10px] px-[15px]  mb-3">
                                                    <Link to="/orders" className="bg-[#00BFFF] mb-5 hover:bg-[#00FFFF]  py-3 px-2 rounded-md cursor-pointer flex items-center">
                                                        <BsCartCheck size={25} className="inline mr-[1rem]" />
                                                        <span className="text-lg  font-Roboto font-semibold">My Orders</span>
                                                    </Link>
                                                    <Link to="/cart" className="bg-pink-500 hover:bg-[#FF1493] mb-5 py-3 px-2 rounded-md cursor-pointer flex items-center">
                                                        <GrCart size={25} className="inline mr-[1rem]" />
                                                        <span className="text-lg  font-Roboto font-semibold">Go to Cart</span>
                                                    </Link>
                                                    <Link to="/compare" className="bg-yellow-500 hover:bg-[#FFFF00] mb-5 py-3 px-2 rounded-md cursor-pointer flex items-center">
                                                        <MdOutlineFlipCameraAndroid size={25} className="inline mr-[1rem]" />
                                                        <span className="text-lg  font-Roboto font-semibold">Compare</span>
                                                    </Link>
                                                    <Link to="/blogs" className="bg-green-500 hover:bg-[#7CFC00] mb-5 py-3 px-2 rounded-md cursor-pointer flex items-center">
                                                        <BsBook size={25} className="inline mr-[1rem]" />
                                                        <span className="text-lg  font-Roboto font-semibold">Blogs</span>
                                                    </Link>
                                                    <Link to="/products" className="bg-red-500 hover:bg-[#FF0000] mb-5 py-3 px-2 rounded-md cursor-pointer flex items-center">
                                                        <AiOutlineAppstore size={25} className="inline mr-[1rem]" />
                                                        <span className="text-lg  font-Roboto font-semibold">Store</span>
                                                    </Link>
                                                </div>
                                            ) : null
                                        }

                                    </div>
                                </div>
                                <div className="md:w-9/12 w-full grid sm:gap-5">
                                    {
                                        wishlist?.map((item, index) => (
                                            <div className="" key={index}>
                                                <ProductCard isHidden={true} data={item} wishlist={wishlist} />
                                                <LongCard isHidden={true} data={item} wishlist={wishlist} />
                                            </div>

                                        ))
                                    }

                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
        </>


    )
}

export default React.memo(Wishlist)