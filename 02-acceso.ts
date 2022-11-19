class Animal {
  public raza: string;
  public color: string;

  constructor() {
    this.raza = "Siberian Husky";
    this.color = "marrón";
  }

  public obtenerDescripcion(): string {
    return "Raza: " + this.raza + " Color: " + this.color;
  }
}

const animal = new Animal();

console.log("raza", animal.raza);
console.log("color", animal.color);
console.log("animal", animal);
console.log("descripción", animal.obtenerDescripcion());
