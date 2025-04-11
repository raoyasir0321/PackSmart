import React, { useState, useMemo, useEffect } from "react";
import ProductsGridView from "./ProductsGridView.jsx/ProductsGridView";
import CustomSelectOption from "../../../components/SelectOption/CustomSelectOption";
import { useSections } from "../../../api/hooks/useSection";
import Spinner from "@/components/Spinner";
// import { Spinner } from "react-bootstrap";

function CategoriesProducts({ sectionId, products: initialProducts }) {
  const [sortBy, setSortBy] = useState("Newest");
  const [pagination, setPagination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [activeProducts, setActiveProducts] = useState([]);
  const { fetchSectionProducts } = useSections();
  const {
    data: fetchedProducts,
    isLoading,
    isError,
  } = fetchSectionProducts(sectionId);

  const products = initialProducts || fetchedProducts || [];

  const sortOptions = ["Newest", "Low To High", "High To Low"];
  const pageOptions = ["Show 10", "Show 20", "Show 30"];

  if (isLoading)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  if (isError) return <p>Failed to fetch products. Please try again later.</p>;

  const validProducts = products.filter(
    (product) => Object.keys(product).length > 0
  );

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return validProducts;
    return validProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [validProducts, searchTerm]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    if (sortBy === "Low To High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "High To Low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest") {
      sorted.reverse();
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  const activeProducts = useMemo(() => {
    if (sortedProducts.length > 0) {
      return sortedProducts;
    } else if (filteredProducts.length > 0) {
      return filteredProducts;
    }
    return [];
  }, [sortedProducts, filteredProducts]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
      <div className="right">
        <div className="search-filter">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="input-group has-search">
              <input
                type="text"
                className="form-control inner-filter"
                placeholder="Search for anything..."
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn filter-search" type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
          </form>
          <div className="mobile-input">
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle">☰ Filter Search</label>
          </div>

          <div className="sortby">
            <span className="text-black">Sort By: </span>
            <CustomSelectOption
              options={sortOptions}
              selectedOption={sortBy}
              setSelectedOption={setSortBy}
              placeholder="Sort By"
            />
            <a href="#">
              <img
                src={"/images/order-list.png"}
                className="d-xl-block d-none"
                alt="Order List"
              />
            </a>
          </div>
        </div>
        <div className="active-filter">
          <div className="d-xl-flex d-none align-items-center gap-2">
            <span>Active Filter: </span>
          </div>
          <span className="results">
            {activeProducts?.length}
            <small className="ms-2">Results found</small>
          </span>
        </div>
        <ProductsGridView sectionId={sectionId} products={sortedProducts} />
        {/* <div className="pagination">
          <CustomSelectOption
            options={pageOptions}
            selectedOption={pagination}
            setSelectedOption={setPagination}
            placeholder="Sort By"
          />
          <div className="page-number">
            <a href="#">
              <i className="fa fa-angle-left" />
            </a>
            <a href="#">1</a>
            <a href="#" className="active">
              2
            </a>
            <a href="#">3</a>
            <a href="#">
              <i className="fa fa-angle-right" />
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CategoriesProducts;
