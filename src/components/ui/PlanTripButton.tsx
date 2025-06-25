
"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Plane, Loader2 } from 'lucide-react'

interface PlanTripButtonProps {
  onPlanTrip?: () => Promise<void> | void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

const PlanTripButton: React.FC<PlanTripButtonProps> = ({
  onPlanTrip = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Trip planning completed!')
  },
  disabled = false,
  className = '',
  children = 'Plan Your Trip'
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [error, setError] = useState<string | null>(null)
  const [isAnimatingPlane, setIsAnimatingPlane] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationTimersRef = useRef<NodeJS.Timeout[]>([])

  const addTimer = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      callback()
      animationTimersRef.current = animationTimersRef.current.filter(t => t !== timer)
    }, delay)
    animationTimersRef.current.push(timer)
    return timer
  }, [])

  const clearAllTimers = useCallback(() => {
    animationTimersRef.current.forEach(timer => clearTimeout(timer))
    animationTimersRef.current = []
  }, [])

  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [clearAllTimers])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Throttle mouse position updates
    // Using a simple check to reduce state updates, could be more sophisticated with requestAnimationFrame
    if (Math.abs(x - mousePosition.x) > 1 || Math.abs(y - mousePosition.y) > 1) {
      setMousePosition({ x, y })
    }
  }, [mousePosition.x, mousePosition.y])

  const handleClick = async () => {
    if (disabled || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      await onPlanTrip()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to plan trip')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setIsAnimatingPlane(true)
    clearAllTimers() // Clear any ongoing animation timers

    // Start plane flying after text fades out (200ms)
    addTimer(() => {
      // No explicit planePosition state needed, just let CSS handle the animation
    }, 200)

    // End animation sequence (plane finishes flying)
    addTimer(() => {
      setIsAnimatingPlane(false)
    }, 800)
  }, [addTimer, clearAllTimers])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    // Animation continues to play even if mouse leaves, setIsAnimatingPlane will handle its own end
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Memoize dynamic styles to prevent re-computation on every render if props don't change
  const buttonBackgroundStyle = useMemo(() => {
    return isHovered
      ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
      : 'transparent'
  }, [isHovered, mousePosition])

  const gradientBorderStyle = useMemo(() => {
    return isHovered
            ? `conic-gradient(from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%, 
          #3b82f6, #8b5cf6, #06b6d4, #10b981, #84cc16, #f59e0b, #ef4444, #3b82f6)`
      : 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)'
  }, [isHovered, mousePosition])

  return (
        <div className="relative inline-block p-8">
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        disabled={disabled || isLoading}
        className={`
          relative overflow-hidden
          px-8 py-4 md:px-10 md:py-5
          bg-background
          text-foreground
          font-semibold text-base md:text-lg
          rounded-full
          border-2 border-transparent
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-4 focus:ring-blue-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95
          group
          ${className}
        `}
        style={{ background: buttonBackgroundStyle }}
        aria-label={typeof children === 'string' ? children : 'Plan your trip'}
        aria-describedby={error ? 'trip-button-error' : undefined}
      >
        {/* Gradient Border */}
        <div
          className={`
            absolute inset-0 rounded-full p-[2px]
            transition-all duration-500 ease-out
            ${isHovered ? 'opacity-100' : 'opacity-70'}
          `}
          style={{ background: gradientBorderStyle }}
        >
          <div className="w-full h-full bg-background rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          {/* Flying Plane Animation with Trail Lines */}
          <div className={`
            absolute
            transition-all duration-600 linear
            ${isAnimatingPlane ? 'translate-x-[500%] opacity-100' : '-translate-x-[500%] opacity-0'}
          `}>
            {/* Trail Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Trail Line 1 */}
                            <div className={`
                absolute w-[200px] h-0.5 bg-gradient-to-r from-blue-500/60 via-blue-500/40 to-transparent
                -translate-x-[190px] -translate-y-0.5
                transition-all duration-600 linear
                ${isAnimatingPlane ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
              `} />

              {/* Trail Line 2 */}
              <div className={`
                absolute w-[180px] h-0.5 bg-gradient-to-r from-lime-500/40 via-lime-500/25 to-transparent
                -translate-x-[170px] translate-y-0.5
                transition-all duration-600 linear
                ${isAnimatingPlane ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
              `} 
              style={{ 
                background: `linear-gradient(to right, rgba(132, 204, 22, 0.4), rgba(132, 204, 22, 0.25), transparent)`
              }} />

              {/* Trail Line 3 */}
              <div className={`
                absolute w-[160px] h-0.5 bg-gradient-to-r from-blue-300/30 via-blue-300/15 to-transparent
                -translate-x-[150px] -translate-y-1
                transition-all duration-600 linear
                ${isAnimatingPlane ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
              `} />
            </div>

            {isLoading ? (
              <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin text-blue-500" />
            ) : (
              <Plane className={`
                w-5 h-5 md:w-6 md:h-6 text-blue-500 rotate-45
                transition-transform duration-300
                relative z-10
              `} />
            )}
          </div>

          {/* Button Text */}
          <span className={`
            transition-all duration-200 ease-out
            ${isAnimatingPlane ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}
            ${isLoading ? 'text-blue-500' : 'text-foreground'}
            ${isAnimatingPlane ? 'delay-0' : 'delay-[600ms]'}
          `}>
            {isLoading ? 'Planning...' : children}
          </span>
        </div>

        {/* Shimmer Effect */}
        <div className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12
          transition-transform duration-1000
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `} />

        {/* Pulse Effect on Click */}
        <div className={`
          absolute inset-0 rounded-full
          bg-blue-500/20
          transition-transform duration-300
          ${isLoading ? 'scale-110 opacity-50' : 'scale-100 opacity-0'}
        `} />
      </button>

      {/* Error Message */}
      <div
        role="status" // Changed to status for live region updates
        aria-live="polite" // Announce changes politely
        className="sr-only" // Hidden visually but available to screen readers
      >
        {error}
      </div>
      {error && (
        <div
          id="trip-button-error"
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md animate-in slide-in-from-top-2 duration-200"
        >
          {error}
        </div>
      )}

            {/* Enhanced Glow Effects */}
            {/* Primary Glow - Close to button */}
      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-blue-500/30 via-purple-500/30 via-lime-500/30 to-cyan-500/30
        blur-lg
        transition-all duration-700 ease-out
        -z-10
        ${isHovered ? 'opacity-80 scale-110' : 'opacity-40 scale-100'}
      `} 
      style={{
        background: `linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(132, 204, 22, 0.3), rgba(6, 182, 212, 0.3))`
      }} />
      
      {/* Secondary Glow - Medium distance */}
      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-blue-400/25 via-purple-400/25 to-cyan-400/25
        blur-2xl
        transition-all duration-1000 ease-out
        -z-20
        ${isHovered ? 'opacity-70 scale-150' : 'opacity-20 scale-110'}
      `} 
      style={{
        background: `linear-gradient(to right, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25), rgba(132, 204, 22, 0.25), rgba(6, 182, 212, 0.25))`
      }} />
      
      {/* Outer Glow - Far reaching drop shadow effect */}
      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-cyan-300/20
        blur-3xl
        transition-all duration-1200 ease-out
        -z-30
        ${isHovered ? 'opacity-60 scale-200' : 'opacity-10 scale-120'}
      `} />
      
      {/* Animated Pulse Ring */}
      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15
        blur-xl
        transition-all duration-2000 ease-out
        -z-40
        ${isHovered ? 'opacity-50 scale-300 animate-pulse' : 'opacity-0 scale-100'}
      `} />
      
      {/* Dynamic Gradient Flow */}
      <div 
        className={`
          absolute inset-0 rounded-full
          blur-2xl
          transition-all duration-800 ease-out
          -z-50
          ${isHovered ? 'opacity-40 scale-180' : 'opacity-0 scale-100'}
        `}
        style={{
          background: isHovered 
                        ? `conic-gradient(from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), 
                rgba(16, 185, 129, 0.3), rgba(132, 204, 22, 0.3), rgba(245, 158, 11, 0.3), 
                rgba(239, 68, 68, 0.3), rgba(59, 130, 246, 0.3))`
            : 'transparent'
        }}
      />
    </div>
  )
}

export default PlanTripButton
