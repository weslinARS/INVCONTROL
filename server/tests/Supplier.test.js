import request from "supertest";
import app from "../app.js";
import SupplierModel from "../models/Supplier.model.js";
import { connectDB, disconnectDB } from "../database.js";
const TokenAdmin =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX2lkIjoiNjRhMTg0YTZlMzVjYmMxOTA5NzhmZTM0IiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTY4ODY0NTM3MSwiZXhwIjoxNjg4OTA0NTcxfQ.J3upgsVbXm_PCQKYMBla9k7yIvJBxjWjRU72c52IW44";

describe("Testing Supplier Routes", function () {
	beforeAll(async () => {
		await connectDB();
	});
	afterAll(async () => {
		await SupplierModel.deleteMany({ supplierName: "testSupplier" });
		await disconnectDB();
	}, 1500);
	describe("GET /suppliers", () => {
		it("should return status 400 if there is no token", async () => {
			const { body, status } = await request(app).get("/suppliers");
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		});
		it("should return status 401 and message if token is invalid", async () => {
			const { body, status } = await request(app)
				.get("/suppliers")
				.set("Authorization", "Bearer invalidToken");
			expect(status).toEqual(401);
			expect(body.message).toBeDefined();
			expect(body.message).toBe("token invalido");
		});
		it("should return 200 ok status code", async () => {
			const response = await request(app)
				.get("/suppliers")
				.set("Authorization", `Bearer ${TokenAdmin}`);
			expect(response).toBeTruthy();
			expect(response.status).toEqual(200);
			expect(response.body).toBeDefined();
			expect(response.body).toBeInstanceOf(Array);
		});
	});
	describe("POST /suppliers", () => {
		it("should return status 400 if there is no token", async () => {
			const { body, status } = await request(app).post("/suppliers");
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		});
    it("should return status 401 and message if token is invalid", async () => {
      const { body, status } = await request(app)
        .post("/suppliers")
        .set('Authorization', 'Bearer invalidToken');
      expect(status).toEqual(401);
      expect(body.message).toBeDefined();
      expect(body.message).toBe('token invalido');
    });
    it('should return status 400 if theres is a probleme with the properties of the product',async()=>{
			const { body, status } = await request(app)
				.post("/suppliers")
				.set("Authorization", `Bearer ${TokenAdmin}`)
				.send({
					supplierName: "testSupplier",
				});
				expect(status).toEqual(400);
				expect(body.errors).toBeDefined();
				expect(body.errors).toBeInstanceOf(Array);
		})
		it('should return status 201 and the supplier created', async()=>{
			const { body, status } = await request(app)
				.post("/suppliers")
				.set("Authorization", `Bearer ${TokenAdmin}`)
				.send({
					supplierName: "testSupplier",
					supplierEmail : ['ejemplo@email.com'],
					supplierPhoneNumbers : ['1234567890'],
				});
				expect(status).toEqual(201);
				expect(body).toBeDefined();
				expect(body).toBeInstanceOf(Object);
		})
	});
	describe("PUT /suppliers/:id", () => {
		it("should return status 400 if there is no token", async () => {
			const { body, status } = await request(app).put("/suppliers/1234567890");
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		});
		it("should return status 401 and message if token is invalid", async () => {
			const { body, status } = await request(app)
				.put("/suppliers/1234567890")
				.set('Authorization', 'Bearer invalidToken');
			expect(status).toEqual(401);
			expect(body.message).toBeDefined();
			expect(body.message).toBe('token invalido');
		});
		it('should return status 400 if theres is a probleme with the properties of the product',async()=>{
			const { body, status } = await request(app)
				.put("/suppliers/1234567890")
				.set("Authorization", `Bearer ${TokenAdmin}`,'Content-Type', 'application/json')
				.send({
					supplierName: 10,
				});
				expect(status).toEqual(400);
				expect(body.errors).toBeDefined();
				expect(body.errors).toBeInstanceOf(Array);
		})
		it('should return 200 and a json of the updated supplier', async()=>{
			const supplier = await SupplierModel.findOne({supplierName : 'testSupplier'});
			const { body, status } = await request(app)
				.put(`/suppliers/${supplier._id}`)
				.set("Authorization", `Bearer ${TokenAdmin}`)
				.send({
					supplierName: "testSupplier",
					supplierEmail : ['Actualizado@email.com'],
					supplierPhoneNumbers : ['1234567890'],
				});
				expect(status).toEqual(200);
				expect(body).toBeDefined();
				expect(body).toBeInstanceOf(Object);
		})
	});
	describe("DELETE /suppliers/:id", () => {
		it("should return status 400 if there is no token", async () => {
			const { body, status } = await request(app).delete("/suppliers/1234567890");
			expect(status).toEqual(400);
			expect(body.message).toBeDefined();
			expect(body.message).toBe(
				"se requiere de un token para acceder a este recurso"
			);
		}
		);
		it("should return status 401 and message if token is invalid", async () => {
			const { body, status } = await request(app)
				.delete("/suppliers/1234567890")
				.set('Authorization', 'Bearer invalidToken');
			expect(status).toEqual(401);
			expect(body.message).toBeDefined();
			expect(body.message).toBe('token invalido');
		});
		it('should return 200 and a json of the deleted supplier', async()=>{
			const supplier = await SupplierModel.findOne({supplierName : 'testSupplier'});
			const { body, status } = await request(app)
				.delete(`/suppliers/${supplier._id}`)
				.set("Authorization", `Bearer ${TokenAdmin}`);
				expect(status).toEqual(200);
				expect(body).toBeDefined();
				expect(body).toBeInstanceOf(Object);
		})
	});
});
