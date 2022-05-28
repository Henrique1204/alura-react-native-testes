import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";

import {
  ENVIADO,
  NAO_ENVIADO,
} from "../../../../src/negocio/constantes/estadosLance";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("Telas Leilao Camponente EnviaLance", () => {
  it("Deve enviar o lance com sucesso quando o botão for clicado.", async () => {
    const mockEnviaLanceFn = jest.fn(
      () => new Promise((resolve) => resolve(ENVIADO))
    );

    const { getByTestId, queryByTestId } = render(
      <EnviaLance enviaLance={mockEnviaLanceFn} cor="blue" />
    );

    const input = getByTestId("input-valor");
    const botao = getByTestId("botao-confirmar");

    fireEvent.changeText(input, "10");

    fireEvent.press(botao);

    await waitFor(() => {
      expect(mockEnviaLanceFn).toHaveBeenCalledWith("10");

      expect(() => getByTestId("texto-erro")).toThrow();
      expect(getByTestId("texto-sucesso")).toBeTruthy();
    });
  });

  it("Deve enviar o lance sem sucesso quando o botão for clicado.", async () => {
    const mockEnviaLanceFn = jest.fn(
      () => new Promise((resolve) => resolve(NAO_ENVIADO))
    );

    const { getByTestId, queryByTestId } = render(
      <EnviaLance enviaLance={mockEnviaLanceFn} cor="blue" />
    );

    const input = getByTestId("input-valor");
    const botao = getByTestId("botao-confirmar");

    fireEvent.changeText(input, "10");

    fireEvent.press(botao);

    await waitFor(() => {
      expect(mockEnviaLanceFn).toHaveBeenCalledWith("10");

      expect(() => getByTestId("texto-sucesso")).toThrow();
      expect(getByTestId("texto-erro")).toBeTruthy();
    });
  });
});
