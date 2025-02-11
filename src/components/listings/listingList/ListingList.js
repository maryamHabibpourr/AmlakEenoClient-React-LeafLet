import React, { useEffect, useState } from "react";
import styles from "./ListingList.module.scss";

//component
import Search from "../../search/Search";
import ListingCard from "../listingItem/ListingCard";
// import { ListingContainer } from "../listingItem/ListingCardStyle";

//react icons
import { BsFillGridFill } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";

//useImmerReducer
import { useImmerReducer } from "use-immer";


//persian tools
import { convertDigits } from "persian-helpers";

//material ui
import { Pagination, Button } from "@mui/material";



function ListingList({ allListings }) {

    // تعریف initialState با مقدار اولیه filteredListings برابر با allListings
    const initialState = {
        category: "همه",
        sort: "روزترین",
        grid: true,
        search: "",
        filteredListings: allListings, // تنظیم مقدار اولیه به allListings
        borough: "همه",
        price: 200000000000,
        minPrice: null,
        maxPrice: null,
    };

    function ReducerFunction(draft, action) {
        // eslint-disable-next-line default-case
        switch (action.type) {
            case "catchSearchChange":
                draft.search = action.serachChose;
                break;
            case "sortChange":
                draft.sort = action.sortChose;
                break;
            case "filterBySearchChange":
                draft.filteredListings = action.filterBySearchChose;
                break;
            case "sortByChange":
                draft.filteredListings = action.sortByChangeChose;
                break;
            case "categoryFilterChange":
                draft.filteredListings = action.categoryFilterChose;
                break;
            case "catchBoroughChange":
                draft.borough = action.boroughChose;
                break;
            case "boroughFilterChange":
                draft.filteredListings = action.boroughFilterChose;
                break;
            case "catchPriceChange":
                draft.price = action.priceChose;
                break;
            case "priceFilterChange":
                draft.filteredListings = action.priceFilterChose;
                break;
            case "cleareFilter":
                draft.price = 2000000000;
                draft.borough = "همه";
                draft.filteredListings = allListings;
                break;
            default:
                return draft;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState("همه");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    //setting for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentListings = state.filteredListings.slice(indexOfFirstItem, indexOfLastItem);

    // تابع تغییر صفحه
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // اسکرول به بالا هنگام تغییر صفحه
    };

    // بازنشانی صفحه فعلی به 1 هنگام تغییر filteredListings
    useEffect(() => {
        setCurrentPage(1);
    }, [state.filteredListings]);

    //setting category####################
    const allCategories = [
        "همه",
        ...new Set(allListings.map((listing) => listing.bargain_type)),
    ];

    //setting Brand########################
    const allBroughs = [
        "همه",
        ...new Set(allListings.map((listing) => listing.borough)),
    ];

    // مرتبط با جستجو
    useEffect(() => {
        dispatch({
            type: "filterBySearchChange",
            filterBySearchChose: allListings.filter((listing) =>
                listing.bargain_type?.includes(state.search) ||
                listing.listing_type?.includes(state.search) ||
                listing.property_type?.includes(state.search) ||
                listing.borough?.includes(state.search)
            ),
        });
    }, [state.search, dispatch, allListings]);

    // مرتبط با مرتب‌سازی
    useEffect(() => {
        const filteredListings = () => {
            if (state.sort === "روزترین") {
                return allListings;
            } else if (state.sort === "کمترین") {
                return allListings.slice().sort((a, b) => {
                    const priceA = parseInt(a.price_for_sale);
                    const priceB = parseInt(b.price_for_sale);
                    return priceA - priceB;
                });
            }
            else if (state.sort === "بیشترین") {
                return allListings.slice().sort((a, b) => {
                    const priceA = parseInt(a.price_for_sale);
                    const priceB = parseInt(b.price_for_sale);
                    return priceB - priceA;
                });
            }
        };
        const sortedListings = filteredListings();
        dispatch({
            type: "sortByChange",
            sortByChangeChose: sortedListings,
        });
    }, [state.sort, dispatch, allListings]);

    /// مرتبط با دسته‌بندی
    function filteredCategoryListings(cat) {
        if (cat === "همه") {
            return allListings;
        } else {
            return allListings.filter((listing) => listing.bargain_type === cat);
        }
    }
    const filterProducts = (cat) => {
        setCategory(cat);
        dispatch({
            type: "categoryFilterChange",
            categoryFilterChose: filteredCategoryListings(cat),
        });
    };

    // مرتبط با محله‌ها
    useEffect(() => {
        function filteredBoroughListings(bro) {
            if (bro === "همه") {
                return allListings;
            } else {
                return allListings.filter((listing) => listing.borough === bro);
            }
        }
        dispatch({
            type: "boroughFilterChange",
            boroughFilterChose: filteredBoroughListings(state.borough),
        });
    }, [state.borough, dispatch, allListings]);

    // مرتبط با قیمت
    function filteredPriceListings() {
        return allListings.filter(listing => parseInt(listing.price_for_sale) <= state.price);
    }

    useEffect(() => {
        const filteredListings = filteredPriceListings();
        dispatch({
            type: "priceFilterChange",
            priceFilterChose: filteredListings,
        });
    }, [state.price, dispatch, allListings]);

    const cleareFilter = () => {
        setCategory("همه");
        dispatch({
            type: "cleareFilter"
        });
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <div className={styles.listingList}>
            <div className={styles.top}>
                <div className={styles.icons}>
                    <Button variant="outlined" startIcon={<BsFillGridFill size={25} color="#e10a1d" />}>
                        <b>{convertDigits(state.filteredListings.length)}</b> ملک یافت شد
                    </Button>
                </div>

                <div className={styles.filterTitlrIcon}
                    onClick={toggleFilter}>
                    {showFilter ? (
                        <Button variant="outlined" startIcon={<FaCogs size={25} color="#ccc" />}>
                            بستن فیلتر
                        </Button>
                    )
                        :
                        (
                            <Button variant="outlined" startIcon={<FaCogs size={25} color="#ccc" />}>
                                نمایش فیلتر
                            </Button>
                        )}
                </div>

                {showFilter &&
                    <div className={
                        showFilter ? `${styles.filt} ${styles.bottom_detaile}` : `${styles.filt} ${styles.bottom_close}`
                    }>
                        <div className={styles.category}>
                            {allCategories.map((cat, index) => {
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`${category}` === cat ? styles.active : null}
                                        onClick={() => filterProducts(cat)}
                                    >
                                        &#8250; {cat}
                                    </button>
                                );
                            })}
                        </div>

                        <div className={styles.brand}>
                            <div className={styles.brandTitle}>
                                <span>محله ها:</span>
                            </div>
                            <select
                                value={state.borough}
                                onChange={(e) => dispatch({
                                    type: "catchBoroughChange",
                                    boroughChose: e.target.value
                                })}>

                                {allBroughs.map((bor, index) => {
                                    return (
                                        <option key={index} value={bor}>
                                            {bor}
                                        </option>
                                    );
                                })}
                            </select>

                            <br />
                            <button
                                onClick={cleareFilter}>
                                حذف فیلتر
                            </button>
                        </div>
                    </div>
                }

                <div className={styles.searchIcon}>
                    <Search
                        value={state.search}
                        onChange={(e) => dispatch({
                            type: "catchSearchChange",
                            serachChose: e.target.value
                        })}
                    />
                </div>

                <div className={styles.sort}>
                    <label> ترتیب بر اساس:</label>
                    <select
                        value={state.sort}
                        onChange={(e) => dispatch({
                            type: "sortChange",
                            sortChose: e.target.value
                        })}
                    >
                        <option value="روزترین">به روز ترین آگهی</option>
                        <option value="کمترین">پایین ترین قیمت</option>
                        <option value="بیشترین">بالاترین قیمت</option>
                    </select>
                </div>

            </div>

            <div className={styles.bottom}>
                <div className={styles.filter}>
                    <div className={styles.category}>
                        <span>دسته بندی:</span>
                        {allCategories.map((cat, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    className={`${category}` === cat ? styles.active : null}
                                    onClick={() => filterProducts(cat)}
                                >
                                    &#8250; {cat}
                                </button>
                            );
                        })}
                    </div>

                    <div className={styles.brand}>
                        <div className={styles.brandTitle}>
                            <span>محله ها:</span>
                        </div>
                        <select
                            value={state.borough}
                            onChange={(e) => dispatch({
                                type: "catchBoroughChange",
                                boroughChose: e.target.value
                            })}>

                            {allBroughs.map((bor, index) => {
                                return (
                                    <option key={index} value={bor}>
                                        {bor}
                                    </option>
                                );
                            })}
                        </select>

                        <br />
                        <button
                            onClick={cleareFilter}>
                            حذف فیلتر
                        </button>
                    </div>
                </div>

                <div className={styles.grid}>
                    {allListings.length === 0 ? (
                        <p>آگهی یافت نشد</p>
                    )
                        :
                        (
                            <>
                                {currentListings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} />
                                ))}
                            </>

                        )
                    }
                </div>

            </div>

            <div className={styles.paginationContainer}>
                <Pagination
                    count={Math.ceil(state.filteredListings.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    )
}

export default ListingList;
