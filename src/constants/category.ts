// constants/categoryEmoji.ts

export const CATEGORY_EMOJI: Record<string, string> = {
    HAMBURGER: '🍔',
    CHICKEN: '🍗',
    FRIES: '🍟',
    DRINK: '🥤',
    DESSERT: '🍰',
    SNACK: '🥨',
    SALAD: '🥗',
    SAUCE: '🥫',
    WRAP: '🌯',
    BREAKFAST: '🍳',
    ICE_CREAM: '🍦',
};

// emoji di fallback se la categoria non è in lista
export const DEFAULT_CATEGORY_EMOJI = "🍽️";

export function getCategoryEmoji(categoryName: string): string {
    return CATEGORY_EMOJI[categoryName] ?? DEFAULT_CATEGORY_EMOJI;
}