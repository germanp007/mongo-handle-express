import { faker } from "@faker-js/faker";

const codeGenerate = () => {
  const letters = faker.random.alpha({ count: 3 });
  const numbers = faker.random.numeric(3);
  return `${letters}${numbers}`.toUpperCase();
};

export const generateFakeProducts = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: codeGenerate(),
    price: parseInt(faker.commerce.price()),
    thumbnails: faker.image.imageUrl(),
    stock: parseInt(faker.random.numeric()),
    category: faker.commerce.department(),
  };
};
