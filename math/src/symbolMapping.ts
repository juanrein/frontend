export type Symbol = {
    latex: string;
    isVisible: boolean;
    text: string;
}

export type SymbolMapping = {
    [key: string]: Symbol;
};