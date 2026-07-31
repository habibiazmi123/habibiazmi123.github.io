"use client"

import type { ReactNode, RefObject } from "react"
import { useCallback, useEffect, useRef } from "react"

type ScrollspyProps = {
  children: ReactNode
  targetRef?: RefObject<
    HTMLElement | HTMLDivElement | Document | null | undefined
  >
  onUpdate?: (id: string) => void
  offset?: number
  smooth?: boolean
  className?: string
  dataAttribute?: string
  history?: boolean
  throttleTime?: number
}

export function Scrollspy({
  children,
  targetRef,
  onUpdate,
  className,
  offset = 0,
  smooth = true,
  dataAttribute = "scrollspy",
  history = true,
}: ScrollspyProps) {
  const selfRef = useRef<HTMLDivElement | null>(null)
  const anchorElementsRef = useRef<Element[] | null>(null)
  const prevIdTracker = useRef<string | null>(null)

  // Sets active nav, hash, prevIdTracker, and calls onUpdate
  const setActiveSection = useCallback(
    (sectionId: string | null, force = false) => {
      if (!sectionId) {
        anchorElementsRef.current?.forEach((item) => {
          item.removeAttribute("data-active")
        })
        prevIdTracker.current = null
        return
      }
      anchorElementsRef.current?.forEach((item) => {
        const id = item.getAttribute(`data-${dataAttribute}-anchor`)
        if (id === sectionId) {
          item.setAttribute("data-active", "true")
        } else {
          item.removeAttribute("data-active")
        }
      })
      if (onUpdate) onUpdate(sectionId)
      if (history && force && prevIdTracker.current !== sectionId) {
        window.history.replaceState({}, "", `#${sectionId}`)
      }
      prevIdTracker.current = sectionId
    },
    [anchorElementsRef, dataAttribute, history, onUpdate]
  )

  const handleScroll = useCallback(() => {
    if (!anchorElementsRef.current || anchorElementsRef.current.length === 0)
      return

    let scrollElement =
      targetRef?.current === document
        ? document.documentElement
        : (targetRef?.current as HTMLElement)

    if (!scrollElement) return

    // If the scrollElement has a data-slot="scroll-area-viewport" inside, use that
    const viewport = scrollElement.querySelector(
      '[data-slot="scroll-area-viewport"]'
    )
    if (viewport instanceof HTMLElement) {
      scrollElement = viewport
    }

    const scrollTop =
      scrollElement === document.documentElement
        ? window.scrollY || document.documentElement.scrollTop
        : scrollElement.scrollTop

    const clientHeight = (scrollElement as HTMLElement).clientHeight
    const viewportCenter = scrollTop + clientHeight / 2
    const threshold = scrollTop + offset

    // Find the section whose center is closest to the viewport center,
    // but only among sections that have already entered the viewport.
    let activeIdx = -1
    let minDelta = Infinity

    anchorElementsRef.current.forEach((anchor, idx) => {
      const sectionId = anchor.getAttribute(`data-${dataAttribute}-anchor`)
      const sectionElement = document.getElementById(sectionId!)
      if (!sectionElement) return

      if (sectionElement.offsetTop > threshold) return

      const sectionCenter =
        sectionElement.offsetTop + sectionElement.offsetHeight / 2
      const delta = Math.abs(sectionCenter - viewportCenter)

      if (delta < minDelta) {
        minDelta = delta
        activeIdx = idx
      }
    })

    // If no section has been reached yet (e.g. hero area), clear active state
    if (activeIdx === -1) {
      setActiveSection(null)
      return
    }

    // Set only one anchor active and sync the URL hash
    const activeAnchor = anchorElementsRef.current[activeIdx]
    const sectionId =
      activeAnchor?.getAttribute(`data-${dataAttribute}-anchor`) || null

    setActiveSection(sectionId)
  }, [anchorElementsRef, targetRef, dataAttribute, offset, setActiveSection])

  const scrollTo = useCallback(
    (anchorElement: HTMLElement) => (event?: Event) => {
      if (event) event.preventDefault()
      const sectionId =
        anchorElement
          .getAttribute(`data-${dataAttribute}-anchor`)
          ?.replace("#", "") || null
      if (!sectionId) return
      const sectionElement = document.getElementById(sectionId)
      if (!sectionElement) return

      let scrollToElement: HTMLElement | Window | null =
        targetRef?.current === document
          ? window
          : (targetRef?.current as HTMLElement)

      if (scrollToElement instanceof HTMLElement) {
        const viewport = scrollToElement.querySelector(
          '[data-slot="scroll-area-viewport"]'
        )
        if (viewport instanceof HTMLElement) {
          scrollToElement = viewport
        }
      }

      let customOffset = offset
      const dataOffset = anchorElement.getAttribute(
        `data-${dataAttribute}-offset`
      )
      if (dataOffset) {
        customOffset = parseInt(dataOffset, 10)
      }

      const scrollTop = sectionElement.offsetTop - customOffset

      if (scrollToElement && "scrollTo" in scrollToElement) {
        scrollToElement.scrollTo({
          top: scrollTop,
          left: 0,
          behavior: smooth ? "smooth" : "auto",
        })
      }
      setActiveSection(sectionId, true)
    },
    [dataAttribute, offset, smooth, targetRef, setActiveSection]
  )

  // Scroll to the section if the ID is present in the URL hash
  const scrollToHashSection = useCallback(() => {
    const hash = CSS.escape(window.location.hash.replace("#", ""))

    if (hash) {
      const targetElement = document.querySelector(
        `[data-${dataAttribute}-anchor="${hash}"]`
      ) as HTMLElement
      if (targetElement) {
        scrollTo(targetElement)()
      }
    }
  }, [dataAttribute, scrollTo])

  useEffect(() => {
    // Query elements and store them in the ref, avoiding unnecessary re-renders
    if (selfRef.current) {
      anchorElementsRef.current = Array.from(
        selfRef.current.querySelectorAll(`[data-${dataAttribute}-anchor]`)
      )
    }

    const currentAnchors = anchorElementsRef.current
    currentAnchors?.forEach((item) => {
      item.addEventListener("click", scrollTo(item as HTMLElement))
    })

    const onScroll = (event: Event) => {
      const scrollElement =
        targetRef?.current === document
          ? window
          : (targetRef?.current as HTMLElement)
      if (!scrollElement) return

      if (
        scrollElement === window ||
        (scrollElement instanceof HTMLElement &&
          scrollElement.contains(event.target as Node))
      ) {
        handleScroll()
      }
    }

    // Use window listener with capture to catch scroll events from targetRef even if set later
    window.addEventListener("scroll", onScroll, true)

    // Check if there's a hash in the URL and scroll to the corresponding section
    const initialTimeout = setTimeout(() => {
      scrollToHashSection()
      handleScroll()
    }, 100)

    return () => {
      window.removeEventListener("scroll", onScroll, true)
      currentAnchors?.forEach((item) => {
        item.removeEventListener("click", scrollTo(item as HTMLElement))
      })
      clearTimeout(initialTimeout)
    }
  }, [
    targetRef,
    selfRef,
    handleScroll,
    dataAttribute,
    scrollTo,
    scrollToHashSection,
  ])

  return (
    <div data-slot="scrollspy" className={className} ref={selfRef}>
      {children}
    </div>
  )
}