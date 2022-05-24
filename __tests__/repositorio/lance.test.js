import {
  obtemLancesDoLeilao,
  adicionaLance,
} from "../../src/repositorio/lance";

import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes");

const mockLance = [{ id: 1, autor: "Paulo", valor: 20 }];

const mockRequisicao =
  (data, sucesso = true) =>
  () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sucesso) return resolve({ data });

        reject();
      }, 200);
    });
  };

const mockId = 1;

describe("Repositorio Lance", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("obtemLancesDoLeilao", () => {
    it("Deve retornar uma lista de lances preenchida.", async () => {
      apiLeiloes.get.mockImplementation(mockRequisicao(mockLance));

      const lances = await obtemLancesDoLeilao(mockId);

      expect(lances).toEqual(mockLance);

      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith(
        `/lances?leilaoId=${mockId}&_sort=valor&_order=desc`
      );
    });

    it("Deve retornar uma lista de lances vazia.", async () => {
      apiLeiloes.get.mockImplementation(mockRequisicao(undefined, false));

      const lances = await obtemLancesDoLeilao(mockId);

      expect(lances).toEqual([]);

      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith(
        `/lances?leilaoId=${mockId}&_sort=valor&_order=desc`
      );
    });
  });

  describe("adicionaLance", () => {
    it("Deve retornar true.", async () => {
      apiLeiloes.post.mockImplementation(mockRequisicao(true));

      const sucesso = await adicionaLance(mockLance[0]);

      expect(sucesso).toBeTruthy();

      expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.post).toHaveBeenCalledWith("/lances", mockLance[0]);
    });

    it("Deve retornar false.", async () => {
      apiLeiloes.post.mockImplementation(mockRequisicao(undefined, false));

      const sucesso = await adicionaLance(mockLance[0]);

      expect(sucesso).toBeFalsy();

      expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.post).toHaveBeenCalledWith("/lances", mockLance[0]);
    });
  });
});
