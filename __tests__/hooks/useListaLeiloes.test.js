import { renderHook, act } from "@testing-library/react-hooks";

import useListaLeiloes from "../../src/hooks/useListaLeiloes";

import { obtemLeiloes } from "../../src/repositorio/leilao";

jest.mock("../../src/repositorio/leilao");

const mockLeiloes = [
  { id: 1, nome: "Leilão", descricao: "Descrição do leilão" },
];

const mockLeiloesAtualizados = [
  { id: 1, nome: "Leilão", descricao: "Descrição do leilão" },
  { id: 2, nome: "Leilão 2", descricao: "Descrição do leilão 2" },
];

describe("Hooks useListaLeiloes", () => {
  it("Deve retornar uma lista de leilões e uma função para atualizar", async () => {
    obtemLeiloes.mockImplementation(() => mockLeiloes);

    const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());

    expect(result.current[0]).toEqual([]);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(mockLeiloes);

    obtemLeiloes.mockImplementation(() => mockLeiloesAtualizados);

    await act(async () => {
      await result.current[1]();
    });

    expect(result.current[0]).toEqual(mockLeiloesAtualizados);
  });
});
