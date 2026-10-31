"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { AlertCircle, Check, Info, X } from "lucide-react";
import { Product, ProductVariant } from "@/lib/types/domain";
import { idMessages } from "@/lib/i18n";
import { Modal } from "@/components/ui/Overlay";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export interface CartLineItem {
  variantId: string;
  productId: string;
  productSlug: string;
  productName: string;
  sku: string;
  size: string;
  color: string;
  swatchHex: string;
  imageUrl?: string | null;
  unitPrice: number;
  maxStock: number;
  weightGram: number;
  quantity: number;
}

export type ToastType = "success" | "danger" | "info";

interface ToastEntry {
  id: string;
  message: string;
  type: ToastType;
}

interface StoreContextValue {
  cartItems: CartLineItem[];
  cartCount: number;
  cartSubtotal: number;
  cartPulse: boolean;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (
    product: Product,
    variant: ProductVariant,
    quantity?: number
  ) => void;
  updateCartQuantity: (variantId: string, nextQuantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  quickAddProduct: Product | null;
  openQuickAdd: (product: Product) => void;
  closeQuickAdd: () => void;
  wishlistIds: string[];
  isSignedInPreview: boolean;
  setSignedInPreview: (value: boolean) => void;
  toggleWishlist: (productId: string) => void;
  showToast: (message: string, type?: ToastType) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_STORAGE_KEY = "carecare_guest_cart_v1";
const WISHLIST_STORAGE_KEY = "carecare_wishlist_v1";

/**
 * Lightweight localStorage external store helper compatible with React 19 `useSyncExternalStore`
 * (SSR hydration-safe and zero setState-in-effect).
 */
function createLocalStorageArrayStore<T>(key: string) {
  const emptyServerSnapshot: T[] = [];
  let cachedRaw: string | null = null;
  let cachedSnapshot: T[] = emptyServerSnapshot;
  const listeners = new Set<() => void>();

  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) listener();
      };
      if (typeof window !== "undefined") {
        window.addEventListener("storage", onStorage);
      }
      return () => {
        listeners.delete(listener);
        if (typeof window !== "undefined") {
          window.removeEventListener("storage", onStorage);
        }
      };
    },
    getSnapshot(): T[] {
      if (typeof window === "undefined") return emptyServerSnapshot;
      try {
        const raw = window.localStorage.getItem(key);
        if (raw === cachedRaw) return cachedSnapshot;
        cachedRaw = raw;
        if (!raw) {
          cachedSnapshot = emptyServerSnapshot;
          return cachedSnapshot;
        }
        const parsed = JSON.parse(raw) as T[];
        cachedSnapshot = Array.isArray(parsed) ? parsed : emptyServerSnapshot;
        return cachedSnapshot;
      } catch {
        return emptyServerSnapshot;
      }
    },
    getServerSnapshot(): T[] {
      return emptyServerSnapshot;
    },
    set(updater: (prev: T[]) => T[]) {
      const next = updater(this.getSnapshot());
      const nextRaw = JSON.stringify(next);
      cachedRaw = nextRaw;
      cachedSnapshot = next;
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(key, nextRaw);
        } catch {
          // Ignore storage quota restrictions
        }
      }
      notify();
    },
  };
}

const cartStorage = createLocalStorageArrayStore<CartLineItem>(CART_STORAGE_KEY);
const wishlistStorage = createLocalStorageArrayStore<string>(
  WISHLIST_STORAGE_KEY
);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const cartItems = useSyncExternalStore(
    cartStorage.subscribe,
    cartStorage.getSnapshot,
    cartStorage.getServerSnapshot
  );
  const wishlistIds = useSyncExternalStore(
    wishlistStorage.subscribe,
    wishlistStorage.getSnapshot,
    wishlistStorage.getServerSnapshot
  );

  const [isSignedInPreview, setSignedInPreview] = useState(false);
  const [pendingWishlistId, setPendingWishlistId] = useState<string | null>(
    null
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [cartPulse, setCartPulse] = useState(false);
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      if (type !== "danger") {
        window.setTimeout(() => {
          dismissToast(id);
        }, 5000);
      }
    },
    [dismissToast]
  );

  const triggerCartPulse = useCallback(() => {
    setCartPulse(true);
    window.setTimeout(() => setCartPulse(false), 200);
  }, []);

  const addToCart = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      if (variant.stock <= 0) return;

      cartStorage.set((prev) => {
        const existing = prev.find((item) => item.variantId === variant.id);
        if (existing) {
          const cappedQty = Math.min(
            variant.stock,
            existing.quantity + quantity
          );
          return prev.map((item) =>
            item.variantId === variant.id
              ? { ...item, quantity: cappedQty, maxStock: variant.stock }
              : item
          );
        }
        const firstImage = product.images[0];
        return [
          ...prev,
          {
            variantId: variant.id,
            productId: product.id,
            productSlug: product.slug,
            productName: product.name,
            sku: variant.sku,
            size: variant.size,
            color: variant.color,
            swatchHex: firstImage?.swatchHex ?? variant.colorHex,
            imageUrl: firstImage?.url ?? null,
            unitPrice: variant.price,
            maxStock: variant.stock,
            weightGram: variant.weightGram,
            quantity: Math.min(variant.stock, Math.max(1, quantity)),
          },
        ];
      });

      triggerCartPulse();
      showToast(idMessages.product.addedToCartToast, "success");
    },
    [showToast, triggerCartPulse]
  );

  const updateCartQuantity = useCallback(
    (variantId: string, nextQuantity: number) => {
      cartStorage.set((prev) =>
        prev.map((item) =>
          item.variantId === variantId
            ? {
                ...item,
                quantity: Math.min(item.maxStock, Math.max(1, nextQuantity)),
              }
            : item
        )
      );
    },
    []
  );

  const removeFromCart = useCallback(
    (variantId: string) => {
      cartStorage.set((prev) =>
        prev.filter((item) => item.variantId !== variantId)
      );
      showToast(idMessages.cart.removedToast, "info");
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    cartStorage.set(() => []);
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (!isSignedInPreview) {
        setPendingWishlistId(productId);
        setIsLoginModalOpen(true);
        return;
      }

      const exists = wishlistStorage.getSnapshot().includes(productId);
      wishlistStorage.set((prev) =>
        exists ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
      showToast(
        exists
          ? idMessages.product.wishlistUnfoldedToast
          : idMessages.product.wishlistFoldedToast,
        exists ? "info" : "success"
      );
    },
    [isSignedInPreview, showToast]
  );

  const handleInstantPreviewSignIn = () => {
    setSignedInPreview(true);
    setIsLoginModalOpen(false);
    if (pendingWishlistId) {
      wishlistStorage.set((prev) =>
        prev.includes(pendingWishlistId) ? prev : [...prev, pendingWishlistId]
      );
      showToast(idMessages.product.wishlistFoldedToast, "success");
      setPendingWishlistId(null);
    }
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cartItems]
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      cartPulse,
      isCartDrawerOpen,
      openCartDrawer: () => setIsCartDrawerOpen(true),
      closeCartDrawer: () => setIsCartDrawerOpen(false),
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      quickAddProduct,
      openQuickAdd: (product) => setQuickAddProduct(product),
      closeQuickAdd: () => setQuickAddProduct(null),
      wishlistIds,
      isSignedInPreview,
      setSignedInPreview,
      toggleWishlist,
      showToast,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      cartPulse,
      cartSubtotal,
      clearCart,
      isCartDrawerOpen,
      isSignedInPreview,
      quickAddProduct,
      removeFromCart,
      showToast,
      toggleWishlist,
      updateCartQuantity,
      wishlistIds,
    ]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}

      {/* Login required modal when visitor taps wishlist dog-ear */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title={idMessages.common.loginRequiredTitle}
      >
        <div className="flex flex-col gap-5">
          <p className="type-body text-ink max-w-[65ch]">
            {idMessages.common.loginRequiredBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <ButtonLink href="/login" variant="primary">
              {idMessages.common.goToLogin}
            </ButtonLink>
            <ButtonLink href="/register" variant="secondary">
              {idMessages.common.goToRegister}
            </ButtonLink>
          </div>
          <div className="border-t border-line-soft pt-3">
            <Button
              variant="text"
              onClick={handleInstantPreviewSignIn}
              className="type-small"
            >
              {idMessages.common.previewLoginInstant}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast stack: bottom on mobile, top-right on desktop (DESIGN.md Section 9) */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-auto sm:top-5 sm:right-5 z-50 flex flex-col gap-2.5 sm:w-[360px]"
      >
        {toasts.map((toast) => {
          const isError = toast.type === "danger";
          return (
            <div
              key={toast.id}
              role={isError ? "alert" : "status"}
              className={cn(
                "pointer-events-auto flex items-start justify-between gap-3 bg-ink text-surface p-3.5 border-base border-l-[6px]",
                toast.type === "success" && "border-l-success",
                toast.type === "danger" && "border-l-danger",
                toast.type === "info" && "border-l-info"
              )}
            >
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0">
                  {toast.type === "success" && (
                    <Check className="h-4 w-4 text-gold" aria-hidden="true" />
                  )}
                  {toast.type === "danger" && (
                    <AlertCircle
                      className="h-4 w-4 text-gold"
                      aria-hidden="true"
                    />
                  )}
                  {toast.type === "info" && (
                    <Info className="h-4 w-4 text-gold" aria-hidden="true" />
                  )}
                </span>
                <p className="type-small font-medium text-surface">
                  {toast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label={idMessages.common.close}
                className="on-ink flex h-7 w-7 shrink-0 items-center justify-center text-surface hover:text-gold"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return ctx;
}
