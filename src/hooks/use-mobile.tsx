
import * as React from "react"

export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export type Breakpoint = keyof typeof BREAKPOINTS

export function useBreakpoint(breakpoint: Breakpoint) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`)
    const onChange = () => {
      setIsAboveBreakpoint(mql.matches)
    }
    mql.addEventListener("change", onChange)
    onChange() // Set initial value
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return isAboveBreakpoint
}

export function useIsMobile() {
  const isAboveMobile = useBreakpoint("md")
  return isAboveMobile === false
}

export function useIsTablet() {
  const isAboveMobile = useBreakpoint("md")
  const isBelowDesktop = !useBreakpoint("lg")
  return isAboveMobile && isBelowDesktop
}

export function useIsDesktop() {
  return useBreakpoint("lg")
}
