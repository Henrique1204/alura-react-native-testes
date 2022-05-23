import * as Lance from "../../../src/negocio/formatadores/lance";

describe("Negocios Lance", () => {
  describe("formataMaiorLanceDoLeilao", () => {
    it("Deveria retornar o valor 30 de dentro do lances como maior", () => {
      const lancesMock = [
        { valor: 10 },
        { valor: 20 },
        { valor: 30 },
        { valor: 25 },
      ];

      const valorInicialMock = 5;

      const maiorValor = Lance.formataMaiorLanceDoLeilao(
        lancesMock,
        valorInicialMock
      );

      expect(maiorValor).toEqual(30);
    });

    it("Deveria retornar o valor 50 do valor inicial como maior", () => {
      const lancesMock = [
        { valor: 10 },
        { valor: 20 },
        { valor: 30 },
        { valor: 25 },
      ];

      const valorInicialMock = 50;

      const maiorValor = Lance.formataMaiorLanceDoLeilao(
        lancesMock,
        valorInicialMock
      );

      expect(maiorValor).toEqual(valorInicialMock);
    });
  });
});
