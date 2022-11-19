class Animal {
  raza: string;
  color: string;

  constructor(raza: string, color: string = "melón") {
    this.raza = raza;
    this.color = color;
  }

  descripcion(): string {
    return "Raza del animal: " + this.raza;
  }
}

class Mamifero extends Animal {
  tipo: string;

  constructor(tipo: string, raza: string) {
    super(raza, "jaspeado");
    this.tipo = tipo;
  }
}

const mamifero = new Mamifero("Terrestre", "Canino");

console.log("mamifero", mamifero);
console.log("raza", mamifero.descripcion());
