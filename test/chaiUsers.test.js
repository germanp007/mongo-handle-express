import { expect } from "chai";
import { sessionDao } from "../src/dao";
import { registerModel } from "../src/dao/mongo/models/sessions.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const ObjectId = mongoose.Types.ObjectId;

describe("SessionManagerMongo", () => {
  before(async function () {
    await registerModel.deleteMany({});
  });
  // Test para la creación de usuarios con contraseña hasheada
  it("Debe crear nuevo usuario con contraseña hasheada", async () => {
    const userData = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      age: 25,
      password: await bcrypt.hash("password123", 10),
      rol: "user",
    };

    const newUser = await sessionDao.createUsers(userData);

    expect(newUser).to.have.property("_id");
    expect(newUser.first_name).to.equal(userData.first_name);
    expect(newUser.email).to.equal(userData.email);
  });

  // Test para obtener un usuario por su email
  it("Debe buscar un usuario por email", async () => {
    const userEmail = "natitaanco@hotmail.com";

    const getUser = await sessionDao.getUserByEmail(userEmail);

    expect(getUser).to.have.property("email").equal(userEmail);
    expect(getUser).to.have.property("first_name");
    expect(getUser).to.have.property("last_name");
  });

  // Test para obtener un usuario por su ID
  it("Deberia buscar un usuario segun su ID", async () => {
    const userId = new ObjectId("6519c547af30321c683aa453");

    const retrievedUser = await sessionDao.getUserById(userId);

    expect(retrievedUser).to.have.property("_id").equal(userId);
    expect(getUser).to.have.property("first_name");
    expect(getUser).to.have.property("last_name");
    expect(getUser).to.have.property("email");
  });

  // Test para actualizar un usuario
  it("Debe actualizar los campos de un usuario", async () => {
    const userId = new ObjectId("6519c547af30321c683aa453");
    const newUserDetails = {
      first_name: "UpdatedFirstName",
      last_name: "UpdatedLastName",
      age: 30,
      password: await bcrypt.hash("password123", 10),
      rol: "premium",
    };

    const updatedUser = await sessionDao.updateUser(userId, newUserDetails);

    expect(updatedUser).to.have.property("_id").equal(userId);
    expect(updatedUser.first_name).to.equal(newUserDetails.first_name);
    expect(updatedUser.last_name).to.equal(newUserDetails.last_name);
    expect(updatedUser.email).to.equal(newUserDetails.email);
    expect(updatedUser.age).to.equal(newUserDetails.age);
  });
});
