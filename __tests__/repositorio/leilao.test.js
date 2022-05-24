import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes");

const mockLeiloes = [
  { id: 1, nome: "Leilão", descricao: "Descrição do leilão" },
];

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

describe("Repositorio Leilao", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("obtemLeiloes", () => {
    it("Deve retornar uma lista de leiloes preenchida.", async () => {
      apiLeiloes.get.mockImplementation(mockRequisicao(mockLeiloes));

      const leileos = await obtemLeiloes();

      expect(leileos).toEqual(mockLeiloes);

      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
    });

    it("Deve retornar uma lista de leiloes vazias.", async () => {
      apiLeiloes.get.mockImplementation(mockRequisicao(undefined, false));

      const leileos = await obtemLeiloes();

      expect(leileos).toEqual([]);

      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
    });
  });

  describe("obtemLeilao", () => {
    it("Deve retornar um objeto de leilao.", async () => {
      apiLeiloes.get.mockImplementation(mockRequisicao(mockLeiloes[0]));

      const leilao = await obtemLeilao(mockId);

      expect(leilao).toEqual(mockLeiloes[0]);

      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/1");
    });

    it("Deve retornar um objeto vazio.", async () => {
      apiLeiloes.get.mockImplementation(mockRequisicao(undefined, false));

      const leileos = await obtemLeilao(mockId);

      expect(leileos).toEqual({});

      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith(`/leiloes/${mockId}`);
    });
  });
});
