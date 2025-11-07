import type { StateCreator } from "zustand"

export type MenuAction = {
    click: {
        currency: boolean
        search: boolean
        burger: boolean
        currencyMobile: boolean
        cart: boolean
        login: boolean
        forget: boolean
        forgetSubmit: boolean
    }
    setClick: (key: keyof MenuAction['click'], value: boolean) => void
}

const setClick = (set: (updater: (state: MenuAction) => void) => void) => {
  return (key: keyof MenuAction['click'], value: boolean) => {
    set((state) => ({
      ...state,
      click: {
        ...state.click,
        [key]: value,
      },
    }));
  };
};

export const createMenuSlice: StateCreator<
    MenuAction,
    [['zustand/immer', never]],
    [],
    MenuAction
> = (set) => ({
    click: {
        currency: false,
        search: false,
        burger: false,
        currencyMobile: false,
        cart: false,
        login: false,
        forget: false,
        forgetSubmit: false,
    },
    setClick: setClick(set),
})