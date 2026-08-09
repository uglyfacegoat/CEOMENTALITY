import { describe, expect, it } from 'vitest';
import { translateText } from './i18n';

describe('translateText',()=>{
 it('translates complete interface phrases without creating mixed fragments',()=>{
  expect(translateText('Alexei Petrov submitted a product access application.','ru')).toBe('Alexei Petrov подал заявку на доступ к Product.');
  expect(translateText('Expires in 7 days','ru')).toBe('Истекает в течение 7 дней');
 });

 it('leaves unknown phrases intact instead of translating individual words',()=>{
  expect(translateText('Unknown product access application.','ru')).toBe('Unknown product access application.');
 });

 it('formats dates, relative time and metric deltas for Russian',()=>{
  expect(translateText('May 1 - May 31, 2025','ru')).toBe('1–31 мая 2025');
  expect(translateText('May 12, 2025','ru')).toBe('12 мая 2025');
  expect(translateText('2025-04-30','ru')).toBe('30 апреля 2025');
  expect(translateText('2 min ago','ru')).toBe('2 минуты назад');
  expect(translateText('+1.5pp vs last 30 days','ru')).toBe('+1,5 п.п. за последние 30 дней');
 });

 it('does not change English content',()=>{
  expect(translateText('May 1 - May 31, 2025','en')).toBe('May 1 - May 31, 2025');
 });
});
