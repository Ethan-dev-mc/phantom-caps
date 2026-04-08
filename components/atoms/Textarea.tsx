'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm text-vx-gray300 font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={clsx(
            'w-full bg-vx-gray900 border rounded-lg px-4 py-3 text-sm text-vx-white',
            'placeholder:text-vx-gray500 resize-none',
            'transition-colors duration-150',
            'focus:outline-none focus:border-vx-cyan',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-vx-gray700 hover:border-vx-gray500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-vx-gray500">{hint}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
