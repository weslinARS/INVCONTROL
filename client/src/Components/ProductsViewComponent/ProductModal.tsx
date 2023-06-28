/* eslint-disable @typescript-eslint/no-explicit-any */

interface ObjectProduct {
  [key: string]: any;
}
interface props {
  data: ObjectProduct;
}

export function ProductModal(props: props) {
  console.log(props.data.Nombre);
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="prose modal-box">
          <h2>Producto: {props.data.Nombre}</h2>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Salir
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
