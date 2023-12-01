import { faker } from "@faker-js/faker";

export const generateFakeProducts = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alpha(6),
    price,
    image,
    stock: parseInt(faker.random.numeric()),
    category: faker.commerce.department(),
  };
};
