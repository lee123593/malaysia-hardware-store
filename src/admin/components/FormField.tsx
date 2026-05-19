'use client';

// ============================================================
// 通用表单字段组件
// ============================================================

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  help?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, error, help, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {help && <p className="text-xs text-gray-400 mt-1">{help}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface TrilingualInputProps {
  label: string;
  values: { zh: string; en: string; ms: string };
  onChange: (lang: 'zh' | 'en' | 'ms', value: string) => void;
  required?: boolean;
  type?: 'input' | 'textarea';
  placeholder?: string;
}

export function TrilingualInput({ label, values, onChange, required, type = 'input', placeholder }: TrilingualInputProps) {
  const languages = [
    { code: 'zh' as const, label: '中文', flag: '🇨🇳' },
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'ms' as const, label: 'Bahasa Melayu', flag: '🇲🇾' },
  ];

  const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7] transition-all";
  const textareaClass = inputClass + " resize-none";

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="space-y-2">
        {languages.map(lang => (
          <div key={lang.code} className="flex items-start gap-2">
            <span className="inline-flex items-center gap-1 min-w-[60px] py-2 text-xs text-gray-500">
              <span>{lang.flag}</span> {lang.label}
            </span>
            {type === 'textarea' ? (
              <textarea
                value={values[lang.code]}
                onChange={e => onChange(lang.code, e.target.value)}
                rows={3}
                className={textareaClass}
                placeholder={placeholder ? `${placeholder} (${lang.label})` : `${label} (${lang.label})`}
              />
            ) : (
              <input
                type="text"
                value={values[lang.code]}
                onChange={e => onChange(lang.code, e.target.value)}
                className={inputClass}
                placeholder={placeholder ? `${placeholder} (${lang.label})` : `${label} (${lang.label})`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
