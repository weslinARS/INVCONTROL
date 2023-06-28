/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createPortal } from "react-dom";
import { ProductModal } from "../src/Components/ProductsViewComponent/ProductModal";
interface Product {
    [key: string]: any;
}
interface props {
    data: Product;
}
export  function Portal(props : props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        ver
      </button>
      {showModal &&
        createPortal(
          <ProductModal onClose={() => setShowModal(false)} data={props.data}/>,
          document.body
        )}
    </>
  );
}
