import { clsx } from 'clsx'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Textarea from '@/components/atoms/Textarea'

type FieldType = 'text' | 'email' | 'tel' | 'password' | 'number' | 'select' | 'textarea'

interface FormFieldProps {
  type?: FieldType
  name: string
  label: string
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  className?: string
  // select options
  options?: { value: string; label: string }[]
  // react-hook-form compatible
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
}

export default function FormField({
  type = 'text',
  name,
  label,
  placeholder,
  error,
  hint,
  required,
  disabled,
  className,
  options = [],
  value,
  onChange,
  onBlur,
}: FormFieldProps) {
  const commonProps = { id: name, name, placeholder, error, hint, disabled, value: value ?? '', onChange: onChange as never, onBlur: onBlur as never }

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      <label htmlFor={name} className="text-sm text-vx-gray300 font-medium">
        {label}{required && <span className="text-vx-cyan ml-0.5">*</span>}
      </label>
      {type === 'select' ? (
        <Select options={options} {...commonProps} />
      ) : type === 'textarea' ? (
        <Textarea {...commonProps} />
      ) : (
        <Input type={type} {...commonProps} />
      )}
    </div>
  )
}
