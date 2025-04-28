import { createThemes, defaultComponentThemes } from '@tamagui/theme-builder'
import * as Colors from '@tamagui/colors'

const lightPalette = [
    'hsla(209, 9.8%, 98%, 1)',
    'hsla(209, 9.8%, 96%, 1)',
    'hsla(209, 9.8%, 90%, 1)',
    'hsla(209, 9.8%, 84%, 1)',
    'hsla(209, 9.8%, 65%, 1)',
    'hsla(209, 9.8%, 46%, 1)',
    'hsla(209, 9.8%, 34%, 1)',
    'hsla(209, 9.8%, 26%, 1)',
    'hsla(209, 9.8%, 16%, 1)',
    'hsla(209, 9.8%, 10%, 1)',
    'hsla(209, 9.8%, 8%, 1)',
    'hsla(209, 9.8%, 4%, 1)'
]
const darkPalette = [...lightPalette].reverse();

const lightShadows = {
    shadow1: 'rgba(0,0,0,0.04)',
    shadow2: 'rgba(0,0,0,0.08)',
    shadow3: 'rgba(0,0,0,0.16)',
    shadow4: 'rgba(0,0,0,0.24)',
    shadow5: 'rgba(0,0,0,0.32)',
    shadow6: 'rgba(0,0,0,0.4)',
}

const darkShadows = {
    shadow1: 'rgba(0,0,0,0.2)',
    shadow2: 'rgba(0,0,0,0.3)',
    shadow3: 'rgba(0,0,0,0.4)',
    shadow4: 'rgba(0,0,0,0.5)',
    shadow5: 'rgba(0,0,0,0.6)',
    shadow6: 'rgba(0,0,0,0.7)',
}

const builtThemes = createThemes({
    componentThemes: defaultComponentThemes,
    base: {
        palette: {
            dark: darkPalette,
            light: lightPalette,
        },

        extra: {
            light: {
                ...Colors.green,
                ...Colors.red,
                ...Colors.yellow,
                ...Colors.gray,
                ...lightShadows,
                shadowColor: lightShadows.shadow1,
            },
            dark: {
                ...Colors.greenDark,
                ...Colors.redDark,
                ...Colors.yellowDark,
                ...Colors.grayDark,
                ...darkShadows,
                shadowColor: darkShadows.shadow1,
            },
        },
    },
    accent: {
        palette: {
            dark: [
                'hsla(209, 98%, 12%, 1)',
                'hsla(209, 98%, 21%, 1)',
                'hsla(209, 98%, 33%, 1)',
                'hsla(209, 98%, 40%, 1)',
                'hsla(209, 98%, 48%, 1)',
                'hsla(209, 98%, 53%, 1)',
                'hsla(209, 98%, 60%, 1)',
                'hsla(209, 98%, 68%, 1)',
                'hsla(209, 98%, 78%, 1)',
                'hsla(209, 98%, 87%, 1)',
                'hsla(209, 98%, 93%, 1)',
                'hsla(209, 98%, 97%, 1)'
            ],
            light: [
                'hsla(209, 98%, 12%, 1)',
                'hsla(209, 98%, 21%, 1)',
                'hsla(209, 98%, 33%, 1)',
                'hsla(209, 98%, 40%, 1)',
                'hsla(209, 98%, 48%, 1)',
                'hsla(209, 98%, 53%, 1)',
                'hsla(209, 98%, 60%, 1)',
                'hsla(209, 98%, 68%, 1)',
                'hsla(209, 98%, 78%, 1)',
                'hsla(209, 98%, 87%, 1)',
                'hsla(209, 98%, 93%, 1)',
                'hsla(209, 98%, 97%, 1)'
            ],
        },
    },
    childrenThemes: {
        warning: {
            palette: {
                dark: Object.values(Colors.yellowDark),
                light: Object.values(Colors.yellow),
            },
        },

        error: {
            palette: {
                dark: Object.values(Colors.redDark),
                light: Object.values(Colors.red),
            },
        },

        success: {
            palette: {
                dark: Object.values(Colors.greenDark),
                light: Object.values(Colors.green),
            },
        },
    }
})

export type Themes = typeof builtThemes

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
export const themes: Themes =
    process.env.TAMAGUI_ENVIRONMENT === 'client' &&
    process.env.NODE_ENV === 'production'
        ? ({} as any)
        : (builtThemes as any)
