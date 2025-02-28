import "./styles.css";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";

const PAGE_SIZE = 10;

export default function App() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    console.log(json);
    setProduct(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const totalProducts = product.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  return !product.length ? (
    <h1> No Products found</h1>
  ) : (
    <div className="App">
      <div>
        <h1>Pagination</h1>
        <div className="products-container">
          {product.slice(start, end).map((p) => (
            <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
          ))}
        </div>
        <div className="pagination-container">
          {[...Array(noOfPages).keys()].map((n) => (
            <span
              className="pageNumber"
              key={n}
              onClick={() => handlePageChange(n)}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
