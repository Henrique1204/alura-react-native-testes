import * as Moeda from "../../../src/negocio/formatadores/moeda";

describe("Negocios Moeda", () => {
  describe("formataBrasileiroParaDecimal", () => {
    it('Deveria formatar o valor "8,59" para 8.59', () => {
      const valorMock = "8,59";

      const valorFormtado = Moeda.formataBrasileiroParaDecimal(valorMock);

      expect(valorFormtado).toEqual(8.59);
    });
  });

  describe("formataDecimalParaReal", () => {
    it('Deveria formatar o valor 8.59 para "R$ 8,59"', () => {
      const valorMock = 8.59;

      const valorFormtado = Moeda.formataDecimalParaReal(valorMock);

      expect(valorFormtado).toEqual("R$\xa08,59");
      expect(valorFormtado).toMatch(/R\$\s8,59/);
    });
  });
});
