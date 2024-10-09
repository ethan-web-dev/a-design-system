import * as React from 'react'
import { Button, ButtonProps } from './Button'
import { useTheme } from '../react-hooks/useTheme'
import type { Theme } from '../react-providers/ThemeProvider'
import { cn } from '../utils/cn'
import { isDevelopmentOnly } from '../utils/isDevelopmentOnly'

type ToggleTheme = (
  currentTheme: Theme,
  setTheme: (theme: Theme) => void,
  includeSystemPreference: boolean
) => void

type ThemeChildrenType = {
  light: React.ReactNode
  dark: React.ReactNode
  system?: React.ReactNode
}
/*
 * toggle theme can swap through 'light'/'dark'/'system' and 'light'/'dark'
 * depending if includeSystemPreference is set to true or not.
 */
const toggleTheme: ToggleTheme = (
	activeTheme, 
	setTheme, 
	includeSystemPreference
) => {
  if (includeSystemPreference) {
    setTheme(activeTheme === 'light' ? 'dark' : activeTheme === 'dark' ? 'system' : 'light')
  } else {
    setTheme(activeTheme === 'light' ? 'dark' : 'light')
  }
}
/*
 * If no value is specified to the themeChildren props, provide a fallback 
 * for each case. Super simple, defaults to 'light', 'dark', and 'system' 
 * respectively. 
 */
const renderChildren = (
	theme: Theme, 
	themeChildren?: ThemeChildrenType, 
	includeSystemPreference = false
): React.ReactNode => {
  if (themeChildren) {
    if (theme === 'system' && includeSystemPreference && themeChildren.system) {
      return themeChildren.system
    }
    return themeChildren[theme] || theme
  }
  return theme
}
/* 
 * checkSystemPreferenceIsValidProp function checks that there are no leftover 
 * values inside of the themeChildren 'system' prop during dev mode. In produ-
 * ction the error check is removed entirely and tree shaken.
 */
const checkSystemPreferenceIsValidProp = (
  includeSystemPreference: boolean,
  themeChildren?: ThemeChildrenType
) => {
  React.useEffect(() => {
    if (!includeSystemPreference && themeChildren?.system) {
      console.error(`${COMPONENT_NAME}:'system' child provided but 'includeSystemPreference' is false. The 'system' child will be ignored.`)
    }
  }, [includeSystemPreference, themeChildren])
}
/*
 * Wire everything up to the component below.
 *
 * We supply the onClick prop to allow for this button to have features outside 
 * of just switching the theme.
 */
export interface ButtonTogglesThemeProps extends ButtonProps {
  includeSystemPreference?: boolean
  themeChildren?: ThemeChildrenType
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}
/*
 * This might seem obvious, but if you miss it in the function below, we only 
 * include the checkSystemPreferenceIsValid useEffect hook in VITE_ENV=development. 
 * Otherwise we don't care to include it in our final bundle. 
 */
const ButtonTogglesTheme = React.forwardRef<HTMLButtonElement, ButtonTogglesThemeProps>(
  ({ variant, size, className, includeSystemPreference = false, themeChildren, onClick, ...props }, ref) => {
    const { theme, setTheme } = useTheme<Theme>('system')

		const buttonLabel = renderChildren(theme, themeChildren, includeSystemPreference)

		const onClickToggle = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
  		toggleTheme(theme, setTheme, includeSystemPreference)
  		if (onClick) {
    		onClick(event)
  		}
		}, [theme, setTheme, includeSystemPreference, onClick])

    if (isDevelopmentOnly) {
      checkSystemPreferenceIsValidProp(includeSystemPreference, themeChildren)
    }

    return (
      <Button
        ref={ref}
        onClick={onClickToggle}
        variant={variant} 
        size={size}
        className={cn('capitalize', className)} 
        {...props} 
      >
        {buttonLabel}
      </Button>
    )
  }
)
ButtonTogglesTheme.displayName = 'ButtonTogglesTheme'

export { ButtonTogglesTheme }
