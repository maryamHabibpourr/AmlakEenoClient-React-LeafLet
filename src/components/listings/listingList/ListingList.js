import React, { useEffect, useState } from "react";
import styles from "./ListingList.module.scss";

//component
import Search from "../../search/Search"
import ListingCard from "../listingItem/ListingCard";
import { ListingContainer } from "../listingItem/ListingCardStyle"

//react icons
import { BsFillGridFill } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";


//useImmerReducer
import { useImmerReducer } from "use-immer";
import { Button } from "@mui/material";


//persian tools
import { digitsEnToFa , numberToWords} from "@persian-tools/persian-tools";
   




function ListingList({ allListings }) {
    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState("همه")


    //setting category####################
    const allCategories = [
        "همه",
        ...new Set(allListings.map((listing) => listing.bargain_type)),
    ];
    // console.log(allCategories);



    //setting Brand########################
    const allBroughs = [
        "همه",
        ...new Set(allListings.map((listing) => listing.borough)),
    ];
    // console.log(allBroughs);




    const initialState = {
        category: "همه",
        sort: "روزترین",
        grid: true,
        search: "",
        filteredListings: [],
        borough: "همه",
        price:200000000000,
        minPrice: null,
        maxPrice: null,
    }




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
                break
            case "sortByChange":
                draft.filteredListings = action.sortByChangeChose
                break
            case "categoryFilterChange":
                draft.filteredListings = action.categoryFilterChose
                break
            case "catchBoroughChange":
                draft.borough = action.boroughChose;
                return;
            case "boroughFilterChange":
                draft.filteredListings = action.boroughFilterChose;
                break;
            case "catchPriceChange":
                draft.price = action.priceChose;
                return draft;
            case "priceFilterChange":
                draft.filteredListings = action.priceFilterChose;
                break
            case "cleareFilter":
                draft.price = 2000000000;
                draft.borough = "همه";
                draft.filteredListings = allListings;
                break
            default:
                return draft;
        }
    }


    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)





    //related to the filter search
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
    }, [state.search, dispatch]);





    //related to the sorting
    useEffect(() => {
        const filteredListings = () => {
            if (state.sort === "روزترین") {
                // console.log("Sorting by به روزترین آگهی");
                return allListings;
            } else if (state.sort === "کمترین") {
                // console.log("Sorting by کمترین قیمت");
                return allListings.slice().sort((a, b) => {
                    const priceA = parseInt(a.price_for_sale);
                    const priceB = parseInt(b.price_for_sale);
                    return priceA - priceB;
                });
            }
            else if (state.sort === "بیشترین") {
                // console.log("Sorting by بیشترین قیمت");
                return allListings.slice().sort((a, b) => {
                    const priceA = parseInt(a.price_for_sale);
                    const priceB = parseInt(b.price_for_sale);
                    return priceB - priceA;
                });
            }
        };
        const sortedListings = filteredListings();
        // console.log("Sorted Listings:", sortedListings);
        dispatch({
            type: "sortByChange",
            sortByChangeChose: sortedListings,
        });
    }, [state.sort, dispatch, allListings]);






    ///related to the category filtering
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






    //related to the boroughs
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






    //related to price
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
        setCategory("همه")
        dispatch({
            type: "cleareFilter"
        })
    }



    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };





    return (
        <div className={styles.listingList}>


            <div className={styles.top}>

                <div className={styles.icons}>
                    <Button variant="outlined" startIcon={<BsFillGridFill size={25} color="#e10a1d" />}>
                        <b>{digitsEnToFa(state.filteredListings.length)}</b> ملک یافت شد
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


                            {/* <div className={styles.priceContainer}>
                                <div className={styles.priceTitle}>
                                    <span>قیمت:</span>
                                    <span>{`${state.price}تومان`}</span>
                                </div>
                                <div className={styles.price}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000000000000"
                                        value={state.price}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "catchPriceChange",
                                                priceChose: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}
                            <br />
                            <button
                                variant="outlined"
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


                        {/* <div className={styles.priceContainer}>
                            <div className={styles.priceTitle}>
                                <span>قیمت:</span>
                                <span>{`${digitsEnToFa(state.price)}تومان`}</span>
                                <span>{`${numberToWords(state.price)}تومان`}</span> 
                            </div>
                            <div className={styles.price}>
                                <input
                                    type="range"
                                    min="0"
                                    max="200000000000"
                                    value={state.price}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "catchPriceChange",
                                            priceChose: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div> */}
                        <br />
                        <button
                            onClick={cleareFilter}>
                            حذف فیلتر
                        </button>

                    </div>
                </div>

                <div className={styles.grid}>
                    {allListings.lenght === 0 ? (
                        <p>آگهی یافت نشد</p>
                    )
                        :
                        (
                            <>
                                {state.filteredListings.map((listing) => {
                                    return (
                                        <ListingContainer key={listing.id}>
                                            <ListingCard listing={listing} />
                                        </ListingContainer>
                                    );
                                })}
                            </>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default ListingList