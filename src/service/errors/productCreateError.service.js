export const productCreateError = (product) => {
  return `
          Campos Obligatorios:
          title: Este campo es de tipo string yse recibio ${product.title}
          description: Este campo es de tipo string y se recibio ${product.description}
          code: Este campo es de tipo string yse recibio ${product.code}
          price: Este campo es de tipo number y se recibio ${product.price}
          stock: Este campo es de tipo number y se recibio ${product.stock}
          category: Este campo es de tipo string y se recibio ${product.category}
    `;
};
