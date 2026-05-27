import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Product } from '../types/ecommerce';
import { type CartItem } from '../types/cart';

// 1. Definimos a interface completa e definitiva diretamente aqui para o Contexto
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void; // <-- Nova função nas tipagens
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  activeNotification: { isOpen: boolean; productName: string } | null;
  closeNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('techstore:cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Estado que controla o Alerta/Pop-up
  const [activeNotification, setActiveNotification] = useState<{ isOpen: boolean; productName: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('techstore:cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Função para Adicionar ao Carrinho + Disparar Notificação
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.product.id === product.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });

    // Força a reativação do pop-up limpando o anterior se o usuário clicar muito rápido
    setActiveNotification(null);
    setTimeout(() => {
      setActiveNotification({ isOpen: true, productName: product.name });
    }, 10);
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.product.id === productId);
      
      if (itemExists && itemExists.quantity > 1) {
        return prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      // Se a quantidade for 1 e o usuário clicar em diminuir, removemos do carrinho
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const closeNotification = () => {
    setActiveNotification(null);
  };

  // Auto-fechamento após 3 segundos
  useEffect(() => {
    if (activeNotification?.isOpen) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity, // <-- Injetando aqui
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        activeNotification,
        closeNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}