import request from "supertest";
import app from "../app.js";
import ProductModel from "../models/Product.model.js";
import { connectDB, disconnectDB } from "../database.js";
const TokenAdmin =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX2lkIjoiNjRhMTg0YTZlMzVjYmMxOTA5NzhmZTM0IiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTY4ODY0NTM3MSwiZXhwIjoxNjg4OTA0NTcxfQ.J3upgsVbXm_PCQKYMBla9k7yIvJBxjWjRU72c52IW44";
describe("Testing Product Routes", function () {
	beforeAll(async () => {
		await connectDB();
	});
	afterAll(async () => {
		await ProductModel.deleteMany({ productName: "testProduct" });
		await disconnectDB();
	}, 1500);
	describe("GET /products", () => {
		it("should return status 400 if there is no token", async () => {
			const { body, status } = await request(app).get("/products");
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		});
		it("should return status 401 and message if token is invalid", async () => {
			const { status, body } = await request(app)
				.get("/products")
				.set("Authorization", "Bearer invalidToken");
			expect(status).toEqual(401);
			expect(body.message).toBeDefined();
			expect(body.message).toBe("token invalido");
		});
		it("should return 200 ok status code", async () => {
			const response = await request(app)
				.get("/products")
				.set("Authorization", `Bearer ${TokenAdmin}`);
			expect(response).toBeTruthy();
			expect(response.status).toEqual(200);
			expect(response.body).toBeDefined();
			expect(response.body).toBeInstanceOf(Array);
		});
	});
	describe("POST /products", () => {
		it("should return a status 400 if there is no token", async () => {
			const { body, status } = await request(app)
				.post("/products")
				.set("Content-Type", "application/json");
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		});
		it("shoul return a status 401 if token is invalid", async () => {
			const { body, status } = await request(app)
				.post("/products")
				.set("Content-Type", "application/json")
				.set("Authorization", "Bearer invalidToken");
			expect(status).toEqual(401);
			expect(body.message).toBeDefined();
			expect(body.message).toBe("token invalido");
		});
		it("should return a status 400 and an array of errors is there is something wrong with the product data", async () => {
			const { body, status } = await request(app)
				.post("/products")
				.set("Content-Type", "application/json")
				.set("Authorization", `Bearer ${TokenAdmin}`)
				.send({
					productName: "testProduct",
				});
			expect(body).toBeDefined();
			expect(body.errors).toBeDefined();
			expect(body.errors).toBeInstanceOf(Array);
			expect(status).toEqual(400);
		});
		it("should return a status 201 and the product json created", async () => {
			const { body, status } = await request(app)
				.post("/products")
				.set("Content-Type", "application/json")
				.set("Authorization", `Bearer ${TokenAdmin}`)
				.send({
					productName: "testProduct",
					productPrice: 100,
					productDescription: "testProductDescription",
					productStock: 100,
					productCategory: "testProductCategory",
					productSupplierId: "testProductSupplierId",
				});
			expect(body).toBeDefined();
			expect(status).toEqual(201);
			expect(body).toBeInstanceOf(Object);
		});
	});
	describe("PUT /products/:id", () => {
		it("should return a status 400 and a message if there is no token", async () => {
			const { body, status } = await request(app).put("/products/123");
			expect(body).toBeDefined();
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		});
		it("should return a status 401 and a message if the token is invalid", async () => {
			const { body, status } = await request(app)
				.put("/products/123")
				.set("Authorization", "Bearer invalidToken");
			expect(body).toBeDefined();
			expect(status).toEqual(401);
			expect(body.message).toBeDefined();
			expect(body.message).toBe("token invalido");
		});
		it("should return a status 400 and a message if there is something wrong with the product data", async () => {
			const { body, status } = await request(app)
				.put("/products/123")
				.set("Authorization", `Bearer ${TokenAdmin}`)
				.send({
					productName: "testProduct",
					productPrice: "ss",
				});
			expect(body).toBeDefined();
			expect(status).toEqual(400);
			expect(body).toBeDefined();
			expect(body.errors).toBeDefined();
			expect(body.errors).toBeInstanceOf(Array);
		});
		it("should return a status 200 and the product json updated", async () => {
			const product = await ProductModel.findOne({
				productName: "testProduct",
			});
			const { body, status } = await request(app)
				.put(`/products/${product._id}`)
				.set("Authorization", `Bearer ${TokenAdmin}`)
				.send({
					productName: "testProduct",
					productPrice: 100,
					productDescription: "testProductDescription updated",
					productStock: 100,
					productCategory: "testProductCategory",
					productSupplierId: "testProductSupplierId",
				});
      expect(body).toBeDefined();
      expect(status).toEqual(200);
      expect(body).toBeInstanceOf(Object);
		});
	});
	describe("DELETE /products/:id", () => {
		it("should return a status 400 and a message if there is no token", async () => {
			const { body, status } = await request(app).delete("/products/123");
			expect(body).toBeDefined();
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		});
		it("should return a status 401 and a message if the token is invalid", async () => {
			const { body, status } = await request(app)
				.delete("/products/123")
				.set("Authorization", "Bearer invalidToken");
			expect(body).toBeDefined();
			expect(status).toEqual(401);
			expect(body.message).toBeDefined();
			expect(body.message).toBe("token invalido");
		});
		it("should return a status 404 and a message if the product does not exist", async () => {
			const { body, status } = await request(app)
				.delete("/products/64a7256ec9e8646eaca0b466")
				.set("Authorization", `Bearer ${TokenAdmin}`);
			console.log(body);
			expect(body).toBeDefined();
			expect(status).toEqual(404);
			expect(body.message).toBeDefined();
			expect(body.message).toBe("producto no encontrado");
		});
		it("should return a status 200 and the product deleted", async () => {
			const product = await ProductModel.findOne({
				productName: "testProduct",
			});
			const { body, status } = await request(app)
				.delete(`/products/${product._id}`)
				.set("Authorization", `Bearer ${TokenAdmin}`);
			expect(body).toBeDefined();
			expect(status).toEqual(200);
			expect(body).toBeInstanceOf(Object);
		});
	});
});
