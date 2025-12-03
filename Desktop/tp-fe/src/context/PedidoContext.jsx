/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [pedido, setPedido] = useState(null);
  const [pedidoLista, setPedidoLista] = useState([]);

  return (
    <PedidoContext.Provider value={{
      pedido,
      setPedido,
      pedidoLista,
      setPedidoLista
    }}>
      {children}
    </PedidoContext.Provider>
  );
}