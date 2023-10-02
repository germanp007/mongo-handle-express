import fs from 'fs'
class CartManagerMemory {
  constructor(){
    this.path = path;
  }
  async createCart(){
    try{
      this.path.readFile()
    }catch(error){
      console.log('Error al crear el cart')
    }
  }

  
}
