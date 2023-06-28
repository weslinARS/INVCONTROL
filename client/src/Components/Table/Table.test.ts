import Table from "./Table.component";
import { render, screen } from "@testing-library/react";
describe("Table Test", () => {
  test("Should render table", () => {
    //asercion
    const content = {
      data: [
        {
          productName: "Chocolate",
          productPrice: 12,
          productStock: 60,
          productCategory: "dulces",
        },
      ],
      labels: {
        productName: "Nombre",
        productPrice: "Precio",
        productStock: "Disponibilidad",
        productCategory: "Categoria",
      },
      idLabel: "idProduct",
    };
    render(Table(content));
    expect(screen.getByText(content.data[0].productName)).toBeDefined();
  });
  test("Should render table with different content", () => {
    //asercion
    const content = {
      data: [
        {
          supplierName: "Aceitera",
          supplierPhone: "12563025",
          supplierEmail: "ejemplo@email.com",
        },
      ],
      labels: {
        supplierName: "Nombre",
        supplierPhone: "Telefono",
        supplierEmail: "Correo",
      },
      idLabel: "idSupplier", 
    };
    render(Table(content));
    expect(screen.getByText(content.data[0].supplierName)).toBeDefined();
  });
});
