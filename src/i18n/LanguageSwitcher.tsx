'use client';

// ============================================================
// LanguageSwitcher — 顶部无刷新三国语言切换组件
// 默认英文，支持切换中文 / 马来语
// 设计：克莱因蓝主题，国旗 + 文字，丝滑动效
// ============================================================

import React, { useState, useRef, useEffect } from 'react';
import type { Locale } from './types';
import { localeList } from './types';
import { useI18n } from './i18n-context';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const current = localeList.find((l) => l.code === locale) ?? localeList[1];

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <>
      <style>{css}</style>
      <div ref={containerRef} className="ls-wrapper">
        <button
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={'ls-trigger' + (hover || open ? ' ls-trigger--hover' : '')}
          aria-label={t.footer.langSwitch}
          aria-expanded={open}
        >
          <span className="ls-flag">{current.flag}</span>
          <span className="ls-label">{current.label}</span>
          <span className={'ls-arrow' + (open ? ' ls-arrow--open' : '')}>▾</span>
        </button>

        <div className={'ls-dropdown' + (open ? ' ls-dropdown--open' : '')}>
          {localeList.map((item) => (
            <button
              key={item.code}
              onClick={() => handleSelect(item.code)}
              className={'ls-option' + (item.code === locale ? ' ls-option--active' : '')}
              disabled={item.code === locale}
            >
              <span className="ls-flag">{item.flag}</span>
              <span className="ls-option-label">{item.label}</span>
              {item.code === locale && <span className="ls-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================
// 内嵌 CSS — hover / focus / active 动效全靠这里
// ============================================================
const css = `
.ls-wrapper {
  position: relative;
  display: inline-block;
  z-index: 1000;
}

/* ---- 触发按钮 ---- */
.ls-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 9999px;
  cursor: pointer;
  outline: none;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.ls-trigger--hover,
.ls-trigger:hover {
  background: rgba(255, 255, 255, 0.20);
  border-color: rgba(255, 255, 255, 0.35);
  transform: scale(1.04);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.15);
}

.ls-trigger:active {
  transform: scale(0.97);
  transition: transform 100ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ls-flag {
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
}

.ls-label {
  white-space: nowrap;
}

.ls-arrow {
  font-size: 10px;
  opacity: 0.7;
  margin-left: 2px;
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ls-arrow--open {
  transform: rotate(180deg);
}

/* ---- 下拉菜单 ---- */
.ls-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  background: #FFFFFF;
  border: 1px solid #E8E8ED;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 47, 167, 0.12);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ls-dropdown--open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* ---- 下拉选项 ---- */
.ls-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 400;
  font-family: inherit;
  color: #1D1D1F;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background 180ms cubic-bezier(0.16, 1, 0.3, 1), color 180ms ease;
  -webkit-tap-highlight-color: transparent;
}

.ls-option:hover:not(:disabled) {
  background: #F5F5F7;
  color: #002FA7;
}

.ls-option:active:not(:disabled) {
  background: #E8EDFA;
  transform: scale(0.98);
}

.ls-option--active {
  background: #E8EDFA;
  color: #002FA7;
  font-weight: 600;
  cursor: default;
}

.ls-option-label {
  flex: 1;
}

.ls-check {
  font-size: 14px;
  color: #002FA7;
  font-weight: 600;
}
`;
