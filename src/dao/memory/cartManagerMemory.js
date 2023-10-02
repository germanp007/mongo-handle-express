import fs from 'fs'
class CartManagerMemory {
  constructor(){
    this.path = path;
  }
  async getCarts(){
    try{
      const result = await JSON.parse(this.path.readFile());
      return result;
    }catch(error){
      console.log('Error al crear el cart')
    }
  }
  async createCarts(body){
    try{
      const {title, description, author, date} = body;
      const data = await JSON.parse(this.path.readFile());
      const newCart = {
        id: data.length > 0 ? data[data.legth - 1].id + 1 : 1
        title,
        descriptio,
        author,
        date
      };
    }catch(error){
      console.log('No fue posible crear el cart')
    }
  }

  
}
