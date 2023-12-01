export const userCreateError = (user) => {
  return `
        Campos Obligatorios:
        name: Este campo es de tipo string yse recibio ${user.first_name}
        lastName: Este campo es de tipo string yse recibio ${user.last_name}
        email: Este campo es de tipo string yse recibio ${user.email}
        age: Este campo es de tipo number y se recibio ${user.age}
  `;
};
