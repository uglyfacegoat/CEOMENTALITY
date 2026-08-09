import type { Language } from './types/domain';

export const languages:Record<Language,string> = { en: 'EN', ru: 'RU' };

const enToRu:Record<string,string> = {
  "Candidate Dossiers": "Досье кандидатов",
  "Access Codes": "Коды доступа",
  "Analytics": "Аналитика",
  "candidate dossiers": "досье кандидатов",
  "access codes": "коды доступа",
  "analytics": "аналитика",
  "Simple CRM": "Простая CRM",
  "A simple CRM with dossiers for every participant in your access pipeline.": "CRM с досье каждого участника воронки доступа.",
  "Access system": "Система доступа",
  "Create and manage unique invite codes for private drops.": "Создавайте и управляйте уникальными кодами для закрытых дропов.",
  "Track performance from application to code activation.": "Отслеживайте путь от заявки до активации кода.",
  "Filters": "Фильтры",
  "Clear all": "Очистить",
  "Search participants...": "Поиск участников...",
  "Search codes or batches...": "Поиск кодов или батчей...",
  "Status": "Статус",
  "All status": "Все статусы",
  "All": "Все",
  "Under review": "На рассмотрении",
  "Approved": "Одобрена",
  "Rejected": "Отклонена",
  "Code assigned": "Код назначен",
  "Code used": "Код использован",
  "Waitlisted": "В листе ожидания",
  "Accepted": "Принята",
  "Wave": "Волна",
  "All waves": "Все волны",
  "Expertise": "Экспертиза",
  "All expertise": "Все направления",
  "Source": "Источник",
  "All sources": "Все источники",
  "Other": "Другое",
  "Save view": "Сохранить вид",
  "Total participants": "Всего участников",
  "Total applications": "Всего заявок",
  "participants": "участников",
  "Sort by:": "Сортировка:",
  "Recently updated": "Недавно обновлённые",
  "Newest first": "Сначала новые",
  "Name A-Z": "По имени А–Я",
  "No candidates match these filters.": "Нет кандидатов по выбранным фильтрам.",
  "Back to dossiers": "Назад к досье",
  "Previous": "Назад",
  "Next": "Далее",
  "Candidate dossier": "Досье кандидата",
  "Approve": "Одобрить",
  "Hold": "Отложить",
  "Reject": "Отклонить",
  "Generate code": "Создать код",
  "Profile summary": "Описание профиля",
  "Key tags": "Ключевые теги",
  "Company": "Компания",
  "Team size": "Размер команды",
  "Founded": "Основана",
  "Funding": "Финансирование",
  "Headquarters": "Штаб-квартира",
  "Access code": "Код доступа",
  "View code details": "Детали кода",
  "No active code": "Нет активного кода",
  "Unique code assigned": "Уникальный код назначен",
  "Code type": "Тип кода",
  "Assigned": "Назначен",
  "Validity": "Срок действия",
  "Expiry": "Срок действия",
  "Expires in 7 days": "Истекает в течение 7 дней",
  "Redeemed": "Использован",
  "Redeemed on": "Дата использования",
  "Last reminder sent": "Последнее напоминание",
  "Notes & activity": "Заметки и активность",
  "Add note": "Добавить заметку",
  "Notes": "Заметки",
  "Activity": "Активность",
  "Private note": "Внутренняя заметка",
  "Add internal comment...": "Добавить внутренний комментарий...",
  "Eligibility & participation": "Допуск и участие",
  "Previous drops participated": "Участие в прошлых дропах",
  "First time applicant": "Первая заявка",
  "Eligibility": "Допуск",
  "Eligible": "Допущен",
  "Meets all platform criteria": "Соответствует всем критериям",
  "Approval history": "История одобрения",
  "Application submitted": "Заявка отправлена",
  "Code redeemed": "Код использован",
  "View full timeline": "Открыть всю историю",
  "Performance context": "Контекст эффективности",
  "Wave stats": "Статистика волны",
  "Applications": "Заявки",
  "Conversion rate": "Конверсия",
  "Fit distribution": "Распределение соответствия",
  "Low": "Низкий",
  "Medium": "Средний",
  "High": "Высокий",
  "Create codes": "Создать коды",
  "Export": "Экспорт",
  "Codes issued": "Выдано кодов",
  "Active codes": "Активные коды",
  "Expired": "Истёк",
  "Conversion": "Конверсия",
  "Create code batch": "Создание батча кодов",
  "Assigned drop": "Назначенный дроп",
  "Single-use": "Одноразовый",
  "Multi-use": "Многоразовый",
  "Quantity": "Количество",
  "Advanced options": "Дополнительные настройки",
  "Prefix by wave": "Префикс волны",
  "Notify managers": "Уведомить менеджеров",
  "Generate codes": "Сгенерировать коды",
  "Code batches": "Батчи кодов",
  "Active": "Активен",
  "Scheduled": "Запланирован",
  "Recently created": "Недавно созданные",
  "Highest issued": "Больше всего выпущено",
  "Most redeemed": "Больше всего использовано",
  "Issued": "Выпущен",
  "Remaining": "Осталось",
  "View batch details": "Открыть батч",
  "Copy access code": "Скопировать код",
  "Export this batch": "Экспортировать батч",
  "Close batch": "Закрыть батч",
  "Reopen batch": "Открыть батч снова",
  "Issuance timeline": "График выдачи",
  "View all batches": "Все батчи",
  "Recent code activity": "Последние действия с кодами",
  "Code issued": "Код выдан",
  "Code expired": "Срок кода истёк",
  "View all activity": "Все действия",
  "Access codes are unique and confidential. Do not share codes publicly.": "Коды доступа уникальны и конфиденциальны. Не публикуйте их.",
  "Drop": "Дроп",
  "All drops": "Все дропы",
  "Completed": "Завершён",
  "Funnel by drop": "Воронка по дропам",
  "Codes generated": "Создано кодов",
  "Codes activated": "Активировано кодов",
  "Overall conversion rate": "Общая конверсия",
  "Conversion rate over time": "Динамика конверсии",
  "Daily": "По дням",
  "Weekly": "По неделям",
  "Monthly": "По месяцам",
  "Performance by drop / wave": "Эффективность дропов и волн",
  "Key insights": "Ключевые выводы",
  "Account & access": "Аккаунт и доступ",
  "Account ": "Аккаунт ",
  " access": " доступ",
  "&": "и",
  "profile settings": "настройки профиля",
  "Manage your identity, workspace role and notification preferences.": "Управляйте профилем, ролью и уведомлениями.",
  "Settings": "Настройки",
  "Personal information": "Личные данные",
  "Notifications": "Уведомления",
  "Access & security": "Доступ и безопасность",
  "Workspace permissions": "Права рабочего пространства",
  "Full name": "Полное имя",
  "Email address": "Электронная почта",
  "Workspace role": "Роль",
  "Interface language": "Язык интерфейса",
  "Manager notifications": "Уведомления менеджера",
  "Save changes": "Сохранить изменения",
  "Cancel": "Отмена",
  "Secure workspace": "Защищённое пространство",
  "Welcome back": "С возвращением",
  "Sign in to manage the CEOMENTALITY access system.": "Войдите для управления системой CEOMENTALITY.",
  "Password": "Пароль",
  "Enter password": "Введите пароль",
  "Show": "Показать",
  "Hide": "Скрыть",
  "Keep me signed in": "Оставаться в системе",
  "Forgot password?": "Забыли пароль?",
  "Sign in": "Войти",
  "Global search": "Глобальный поиск",
  "Search candidates, codes or drops...": "Поиск кандидатов, кодов и дропов...",
  "Profile & settings": "Профиль и настройки",
  "Switch workspace": "Сменить пространство",
  "Sign out": "Выйти",
  "Founder access": "Founder access",
  "Create drop": "Создать дроп",
  "Drop name": "Название дропа",
  "Description": "Описание",
  "Code quantity": "Количество кодов",
  "Shared access code": "Общий код доступа",
  "New candidate": "Новый кандидат",
  "Country": "Страна",
  "Role": "Должность",
  "Application": "Заявка",
  "About": "О кандидате",
  "Create candidate": "Создать кандидата",
  "Activity center": "Центр активности",
  "Mark all read": "Отметить всё прочитанным",
  "Local MVP index": "Локальный индекс MVP",
  "Backend-ready search contract": "Контракт поиска готов к бэкенду",
  "Search across the access system": "Поиск по всей системе доступа",
  "Candidate and demo data are available now. Full server search will use the future API endpoint.": "Сейчас доступны кандидаты и демонстрационные данные. Полный поиск будет подключён через API.",
  "No matching records": "Совпадений не найдено",
  "Activity (5)": "Активность (5)",
  "Apply dates": "Применить даты",
  "Clear": "Очистить",
  "Stage": "Этап",
  "Summary": "Описание",
  "Global ambitions": "Глобальные амбиции",
  "Primary": "Основная",
  "High fit": "Высокое соответствие",
  "Seed + Series A": "Seed + Series A",
  "Club membership": "Членство в клубе",
  "Product purchase": "Покупка Product",
  "Product access": "Доступ к Product",
  "No": "Нет",
  "Yes": "Да",
  "Pending": "Ожидает",
  "Closed": "Закрыт",
  "Drop / wave": "Дроп / волна",
  "Spring Collection Drop": "Весенний дроп",
  "Partner Access": "Партнёрский доступ",
  "Waitlist Release": "Доступ листа ожидания",
  "Next in line": "Следующий в очереди",
  "Brand & Media Partners": "Партнёры бренда и медиа",
  "Partner": "Партнёр",
  "Referral": "Рекомендация",
  "Website": "Сайт",
  "Telegram bot": "Telegram-бот",
  "Codes activated increased 21%": "Активация кодов выросла на 21%",
  "Conversion rate improved 1.5pp": "Конверсия выросла на 1,5 п.п.",
  "Wave 02 delivered the highest": "Волна 02 показала максимальную",
  "compared to the prior 30-day period.": "по сравнению с предыдущими 30 днями.",
  "conversion rate at 14.2%.": "конверсию — 14,2%.",
  "vs the prior 30-day period.": "к предыдущему 30-дневному периоду.",
  "Receive updates about new applications and status changes.": "Получайте уведомления о новых заявках и изменениях статусов.",
  "Shown to other managers in comments and activity history.": "Отображается другим менеджерам в комментариях и истории действий.",
  "English": "Английский",
  "Russian": "Русский",
  "New candidate application": "Новая заявка кандидата",
  "Alexei Petrov submitted a product access application.": "Alexei Petrov подал заявку на доступ к Product.",
  "Wave 01 access code was successfully activated.": "Код доступа для Wave 01 успешно активирован.",
  "Spring Collection Drop closes in 3 days.": "Срок действия «Весеннего дропа» истечёт через 3 дня.",
  "Drop expires soon": "Срок дропа скоро истечёт",
  "ago": "назад",
  "No notes yet": "Заметок пока нет",
  "January": "Январь",
  "February": "Февраль",
  "March": "Март",
  "April": "Апрель",
  "May": "Май",
  "June": "Июнь",
  "July": "Июль",
  "August": "Август",
  "September": "Сентябрь",
  "October": "Октябрь",
  "November": "Ноябрь",
  "December": "Декабрь",
  "Jan": "Янв",
  "Feb": "Фев",
  "Mar": "Мар",
  "Apr": "Апр",
  "Jun": "Июн",
  "Jul": "Июл",
  "Aug": "Авг",
  "Sep": "Сен",
  "Oct": "Окт",
  "Nov": "Ноя",
  "Dec": "Дек",
  "Monday": "Понедельник",
  "Tuesday": "Вторник",
  "Wednesday": "Среда",
  "Thursday": "Четверг",
  "Friday": "Пятница",
  "Saturday": "Суббота",
  "Sunday": "Воскресенье",
  "Mo": "Пн",
  "Tu": "Вт",
  "We": "Ср",
  "Th": "Чт",
  "Fr": "Пт",
  "Sa": "Сб",
  "Su": "Вс",
  "Select year": "Выберите год",
  "Select month": "Выберите месяц",
  "Today": "Сегодня",
  "Yesterday": "Вчера",
  "Tomorrow": "Завтра",
  "This week": "Эта неделя",
  "Last week": "Прошлая неделя",
  "This month": "Этот месяц",
  "Last month": "Прошлый месяц",
  "Custom range": "Свой период",
  "this week": "за неделю",
  "vs last month": "к прошлому месяцу",
  "vs last 30 days": "к прошлым 30 дням",
  "Club Manager": "Менеджер клуба",
  "Loading workspace…": "Загрузка пространства…",
  "Name": "Имя",
  "Draft": "Черновик",
  "New": "Новая",
  "In review": "На проверке",
  "On hold": "Отложена",
  "Code generated": "Код создан",
  "Code sent": "Код отправлен",
  "Purchased": "Покупка совершена",
  "Member": "Участник",
  "Inactive": "Неактивен",
  "Blocked": "Заблокирован",
  "Archived": "В архиве",
  "Open": "Открыт",
  "Paused": "Приостановлен",
  "Cancelled": "Отменён",
  "Processing": "Обрабатывается",
  "Failed": "Ошибка",
  "Generated": "Создан",
  "Revoked": "Отозван",
  "Unused": "Не использован",
  "Partially redeemed": "Частично использован",
  "Administrator": "Администратор",
  "Viewer": "Наблюдатель",
  "Owner": "Владелец",
  "Website form": "Форма на сайте",
  "Telegram": "Telegram",
  "Manual": "Вручную",
  "Import": "Импорт",
  "API": "API",
  "Serial founder with two exits. Building in AI + supply chain with global ambitions.": "Founder двух компаний с успешным exit. Сейчас развивает AI-продукт для автоматизации supply chain.",
  "Deep operator with a track record of scaling global teams and raising capital.": "Сильный operator с опытом масштабирования международных команд и привлечения капитала.",
  "Early-stage investor focused on deep tech and infrastructure.": "Early-stage Investor с фокусом на deep tech и инфраструктуре.",
  "Scaled finance ops across multiple high-growth companies.": "Масштабировал finance ops в нескольких быстрорастущих компаниях.",
  "Product leader with experience in marketplace and SaaS.": "Product leader с опытом в marketplace и SaaS.",
  "Consumer brand builder with international background.": "Создатель consumer-брендов с международным опытом.",
  "Award-winning creative director working with top lifestyle brands.": "Титулованный creative director, работающий с ведущими lifestyle-брендами.",
  "20+ years in media and content strategy.": "Более 20 лет в media и content strategy.",
  "Active angel investing in B2B SaaS.": "Активно инвестирует как angel investor в B2B SaaS.",
  "Strong operator, not a fit for this wave.": "Сильный operator, но не соответствует текущей волне.",
  "AI infrastructure for logistics.": "AI-инфраструктура для логистики.",
  "Strong investor network in EU.": "Сильная сеть контактов среди инвесторов в ЕС.",
  "Referred by Anastasia Belova.": "Приглашён по рекомендации Anastasia Belova.",
  "Strong product sense.": "Сильный product sense.",
  "Invited via partner network.": "Приглашена через партнёрскую сеть.",
  "Creative leader with global campaigns.": "Creative leader с опытом глобальных кампаний.",
  "Media leader with strong audience reach.": "Media leader с большим охватом аудитории.",
  "High demand. Consider for next wave.": "Высокий спрос. Рассмотреть для следующей волны.",
  "Out of scope for current community.": "Не соответствует текущему фокусу сообщества.",
  "Product Lead": "Product Lead",
  "Creative Director": "Creative Director",
  "Editor-in-Chief": "Editor-in-Chief",
  "Angel Investor": "Angel Investor",
  "Switzerland": "Швейцария",
  "Germany": "Германия",
  "Russia": "Россия",
  "Serbia": "Сербия",
  "Italy": "Италия",
  "France": "Франция",
  "United Kingdom": "Великобритания",
  "UK": "Великобритания",
  "United Arab Emirates": "ОАЭ",
  "UAE": "ОАЭ",
  "Choose which workspace events reach you.": "Выберите события, о которых хотите получать уведомления.",
  "Update the password used for this admin workspace.": "Измените пароль администратора.",
  "Review your current workspace access level.": "Проверьте текущий уровень доступа.",
  "Candidate updates": "Обновления кандидатов",
  "New applications and status changes": "Новые заявки и изменения статусов",
  "Drop updates": "Обновления дропов",
  "Codes, redemptions and expiration events": "Коды, активации и истечения срока",
  "Current password": "Текущий пароль",
  "New password": "Новый пароль",
  "Confirm password": "Подтверждение пароля",
  "Full access to candidates, drops, codes, analytics and manager settings.": "Полный доступ к кандидатам, дропам, кодам, аналитике и настройкам.",
  "Candidate management": "Управление кандидатами",
  "Drop & code management": "Управление дропами и кодами",
  "Full": "Полный",
  "Copy code": "Скопировать код",
  "Export batch": "Экспортировать батч",
  "Collapse activity": "Свернуть активность",
  "Candidate data copied": "Данные кандидата скопированы",
  "Note copied": "Заметка скопирована",
  "Timeline copied": "История скопирована",
  "Fit score": "Оценка соответствия",
  "Location": "Местоположение",
  "Applied": "Дата заявки",
  "Last updated": "Обновлено",
  "Code": "Код",
  "Wave / Drop": "Волна / дроп",
  "You": "Вы",
  "Moved to review": "Передано на рассмотрение",
  "Profile updated": "Профиль обновлён",
  "Type": "Тип",
  "Candidate": "Кандидат",
  "No code assigned": "Код не назначен",
  "Send reminder": "Отправить напоминание",
  "Reminder queued": "Напоминание запланировано",
  "Regenerate code": "Создать код заново",
  "Approval timeline": "История одобрения",
  "Waiting for code": "Ожидает код",
  "Close": "Закрыть",
  "Copy timeline": "Скопировать историю"
};

const protectedTerms=['Founder / CEO','Founder','founder','CEO','CFO','SaaS','Enterprise','B2B','B2C','AI','Product','product','Investor','investor','Angel Investor','Startup','Fintech','EdTech','VC','C-level','marketplace','deep tech','supply chain','operator','finance ops','creative director','Creative Director','Media','media','content strategy','Product Lead','Leadership','Scaling teams'];
for (const term of protectedTerms) delete enToRu[term];

const monthIndex:Record<string,number>={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
const russianMonths=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const russianShortMonths=['янв.','февр.','мар.','апр.','мая','июн.','июл.','авг.','сент.','окт.','нояб.','дек.'];

function formatDateText(value:string):string|null {
  const isoDate=value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(isoDate){
    const [,year,month,day]=isoDate;
    const index=Number(month)-1;
    return index<0||index>11?null:`${Number(day)} ${russianMonths[index]} ${year}`;
  }
  const range=value.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}) - (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}), (\d{4})$/);
  if(range){
    const [,startMonth,startDay,endMonth,endDay,year]=range;
    const startIndex=monthIndex[startMonth!],endIndex=monthIndex[endMonth!];
    if(startIndex==null||endIndex==null)return null;
    return startIndex===endIndex?`${startDay}–${endDay} ${russianMonths[endIndex]} ${year}`:`${startDay} ${russianMonths[startIndex]} – ${endDay} ${russianMonths[endIndex]} ${year}`;
  }
  const splitMonthRange=value.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})–(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})$/);
  if(splitMonthRange){
    const [,startMonth,startDay,endMonth,endDay]=splitMonthRange;
    const startIndex=monthIndex[startMonth!],endIndex=monthIndex[endMonth!];
    if(startIndex==null||endIndex==null)return null;
    return `${startDay} ${russianShortMonths[startIndex]} – ${endDay} ${russianShortMonths[endIndex]}`;
  }
  const sameMonthRange=value.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})–(\d{1,2})$/);
  if(sameMonthRange){
    const [,month,startDay,endDay]=sameMonthRange;
    const index=monthIndex[month!];
    return index==null?null:`${startDay}–${endDay} ${russianShortMonths[index]}`;
  }
  const day=value.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})$/);
  if(day){
    const [,month,dayNumber]=day;
    const index=monthIndex[month!];
    return index==null?null:`${dayNumber} ${russianShortMonths[index]}`;
  }
  const fullDate=value.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}), (\d{4})$/);
  if(fullDate){
    const [,month,dayNumber,year]=fullDate;
    const index=monthIndex[month!];
    return index==null?null:`${dayNumber} ${russianMonths[index]} ${year}`;
  }
  return null;
}

function formatRelativeTime(value:string):string|null {
  const match=value.match(/^(\d+)\s*(m|min|minutes?|h|hours?|d|days?) ago$/);
  if(!match)return null;
  const amount=Number(match[1]),rawUnit=match[2]!;
  const unit=rawUnit.startsWith('m')?'minute':rawUnit.startsWith('h')?'hour':'day';
  return new Intl.RelativeTimeFormat('ru',{numeric:'always'}).format(-amount,unit);
}

function formatMetricDelta(value:string):string|null {
  const match=value.match(/^([+-]\d+(?:\.\d+)?)(pp|%) vs last (month|30 days)$/);
  if(!match)return null;
  const number=match[1]!.replace('.',','),unit=match[2]==='pp'?' п.п.':'%',period=match[3]==='month'?'за прошлый месяц':'за последние 30 дней';
  return `${number}${unit} ${period}`;
}

function formatDynamicText(value:string):string|null {
  const count=value.match(/^(Notes|Activity) \((\d+)\)$/);
  if(count)return `${enToRu[count[1]!]??count[1]} (${count[2]})`;
  const codes=value.match(/^(\d+) codes?$/);
  if(codes)return `${codes[1]} кодов`;
  const performance=value.match(/^Performance context \((Wave \d+)\)$/);
  if(performance)return `Контекст эффективности (${performance[1]})`;
  const status=value.match(/^Status: (.+)$/);
  if(status)return `Статус: ${enToRu[status[1]!]??status[1]}`;
  const weekly=value.match(/^([+-]\d+) this week$/);
  if(weekly)return `${weekly[1]} за неделю`;
  const points=value.match(/^([+-]\d+(?:\.\d+)?)pp$/);
  if(points)return `${points[1]!.replace('.',',')} п.п.`;
  if(/^\d{1,3}(,\d{3})+$/.test(value))return value.replaceAll(',',String.fromCharCode(160));
  if(/^[+-]?\d+\.\d+%$/.test(value))return value.replace('.',',');
  if(/^\d+(?:\.\d+)? \(\d+\.\d+%\)$/.test(value))return value.replaceAll('.',',');
  return null;
}

export function translateText(value:string, language:Language):string {
  if(language==='en'||!value.trim())return value;
  const text=value.trim();
  const translated=enToRu[text]??formatDateText(text)??formatRelativeTime(text)??formatMetricDelta(text)??formatDynamicText(text);
  return translated?value.replace(text,translated):value;
}
