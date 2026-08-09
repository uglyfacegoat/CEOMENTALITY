import { expect, test, type Page } from '@playwright/test';

const viewports=[
 {name:'small phone',width:360,height:800},
 {name:'phone',width:390,height:844},
 {name:'large phone',width:430,height:932},
 {name:'tablet portrait',width:768,height:1024},
 {name:'tablet landscape',width:1024,height:768},
 {name:'laptop',width:1366,height:768},
 {name:'desktop',width:1920,height:1080},
 {name:'wide desktop',width:2560,height:1440}
] as const;

const routes=['/candidates','/candidates/alexei-petrov','/access-codes','/analytics','/profile'] as const;

async function openAuthenticated(page:Page,path:string) {
 await page.addInitScript(()=>localStorage.setItem('ceomentality:session','active'));
 await page.goto(path);
 await expect(page.getByRole('banner')).toBeVisible();
 await expect(page.locator('main.content')).toBeVisible();
}

for(const viewport of viewports)test(`${viewport.name}: all workspace pages fit the viewport`,async({page})=>{
 await page.setViewportSize({width:viewport.width,height:viewport.height});
 for(const route of routes){
  await openAuthenticated(page,route);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflow,`${route} creates body-level horizontal overflow`).toBeLessThanOrEqual(1);
  const main=await page.locator('main.content').boundingBox();
  expect(main).not.toBeNull();
  expect(main!.x).toBeGreaterThanOrEqual(0);
  expect(main!.x+main!.width).toBeLessThanOrEqual(viewport.width+1);
 }
});

test('small phone: login and overlays stay inside the viewport',async({page})=>{
 await page.setViewportSize({width:360,height:800});
 await page.goto('/login');
 await expect(page.locator('.login-card')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(1);
 await page.addInitScript(()=>localStorage.setItem('ceomentality:session','active'));
 await page.goto('/access-codes');
 await page.locator('.date-trigger').first().click();
 const calendar=await page.locator('.calendar-popover').boundingBox();
 expect(calendar).not.toBeNull();
 expect(calendar!.x).toBeGreaterThanOrEqual(0);
 expect(calendar!.x+calendar!.width).toBeLessThanOrEqual(360);
});

test('phone: analytics labels and chart scale remain aligned',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await openAuthenticated(page,'/analytics');
 await expect(page.locator('.funnel-labels p')).toHaveCount(4);
 await expect(page.locator('.funnel-values p')).toHaveCount(4);
 const svg=await page.locator('.chart svg').boundingBox();
 const axis=await page.locator('.chart .y-axis').boundingBox();
 expect(svg).not.toBeNull();
 expect(axis).not.toBeNull();
 expect(svg!.height).toBeGreaterThanOrEqual(129);
 expect(Math.abs(svg!.height-axis!.height)).toBeLessThanOrEqual(1);
});

test('analytics funnel stays inside its column at responsive boundaries',async({page})=>{
 await openAuthenticated(page,'/analytics');
 for(const width of [320,360,390,430,640,768,900,901,1024,1180,1360,1361,1440,1920,2560,3840]){
  await page.setViewportSize({width,height:900});
  const geometry=await page.locator('.funnel-wrap').evaluate(element=>{
   const funnel=element.querySelector('.funnel')!;
   const funnelRect=funnel.getBoundingClientRect();
   const stageRects=Array.from(funnel.children).map(stage=>stage.getBoundingClientRect());
   const valueRects=Array.from(element.querySelectorAll('.funnel-values strong,.funnel-values span')).map(value=>value.getBoundingClientRect());
   return {
    overflow:getComputedStyle(funnel).overflow,
    stagesInside:stageRects.every(stage=>stage.left>=funnelRect.left-.5&&stage.right<=funnelRect.right+.5),
    overlapsValues:stageRects.some(stage=>valueRects.some(value=>stage.left<value.right&&stage.right>value.left&&stage.top<value.bottom&&stage.bottom>value.top))
   };
  });
  expect(geometry.overflow,`${width}px funnel must clip to its column`).toBe('hidden');
  expect(geometry.stagesInside,`${width}px funnel stage escapes its column`).toBe(true);
  expect(geometry.overlapsValues,`${width}px funnel overlaps numeric values`).toBe(false);
 }
});

test('phone: filters open as a dismissible drawer',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await openAuthenticated(page,'/candidates');
 const sidebar=page.locator('.sidebar');
 await expect(sidebar).toHaveCSS('pointer-events','none');
 await page.getByRole('button',{name:/show filters/i}).click();
 await expect(sidebar).toHaveCSS('pointer-events','auto');
 await expect(page.locator('.mobile-sidebar-scrim')).toHaveCSS('pointer-events','auto');
 await expect(sidebar.locator('.check-group').first()).toBeVisible();
 await expect(sidebar.locator('.filter-block').first()).toBeVisible();
 const search=await sidebar.locator('.search-box').boundingBox();
 const save=await sidebar.locator('.save-view').boundingBox();
 expect(search?.height).toBeGreaterThanOrEqual(53);
 expect(save?.height).toBeGreaterThanOrEqual(57);
 expect(Math.abs((search?.width??0)-(save?.width??0))).toBeLessThanOrEqual(1);
 await expect.poll(async()=>Math.round((await sidebar.boundingBox())?.x??-999)).toBe(0);
 const drawer=await sidebar.boundingBox();
 expect(drawer).not.toBeNull();
 expect(drawer!.x).toBe(0);
 expect(drawer!.width).toBeLessThan(390);
 await sidebar.getByRole('button',{name:/hide filters/i}).click();
 await expect(sidebar).toHaveCSS('pointer-events','none');
});

test('phone: candidate list cards wrap without clipping',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await openAuthenticated(page,'/candidates');
 await page.getByRole('button',{name:/switch candidate view/i}).click();
 await expect(page.locator('.cards-grid')).toHaveClass(/list/);
 const overflow=await page.locator('.candidate-card').evaluateAll(cards=>cards.map(card=>card.scrollWidth-card.clientWidth));
 expect(Math.max(...overflow)).toBeLessThanOrEqual(2);
 await expect(page.locator('.cards-grid.list .notes p').first()).toHaveCSS('white-space','normal');
});

test('iPad Pro portrait: candidate hero and cards stay inside the workspace',async({page})=>{
 await page.setViewportSize({width:1024,height:1366});
 await openAuthenticated(page,'/candidates');
 const content=await page.locator('main.content').boundingBox();
 const metrics=await page.locator('.metric-strip.compact').boundingBox();
 expect(content).not.toBeNull();
 expect(metrics).not.toBeNull();
 expect(metrics!.x).toBeGreaterThanOrEqual(content!.x);
 expect(metrics!.x+metrics!.width).toBeLessThanOrEqual(1024);
 await expect(page.locator('.header-sidebar-toggle-desktop')).toBeVisible();
 const cardEdges=await page.locator('.candidate-card').evaluateAll(cards=>cards.map(card=>card.getBoundingClientRect().right));
 expect(Math.max(...cardEdges)).toBeLessThanOrEqual(1024);
 await expect(page.locator('.metric-strip.compact .metric')).toHaveCount(4);
});

test('responsive boundaries: candidate workspace never clips',async({page})=>{
 for(const width of [900,901,1040,1041,1100,1101,1180,1181,1280,1281,1360]){
  await page.setViewportSize({width,height:900});
  await openAuthenticated(page,'/candidates');
  const viewportOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(viewportOverflow,`${width}px creates body overflow`).toBeLessThanOrEqual(1);
  const content=await page.locator('main.content').boundingBox();
  const metrics=await page.locator('.metric-strip.compact').boundingBox();
  expect(content,`${width}px content is missing`).not.toBeNull();
  expect(metrics,`${width}px metrics are missing`).not.toBeNull();
  expect(metrics!.x+metrics!.width,`${width}px metrics clip`).toBeLessThanOrEqual(width+1);
  const cardEdges=await page.locator('.candidate-card').evaluateAll(cards=>cards.map(card=>card.getBoundingClientRect().right));
  expect(Math.max(...cardEdges),`${width}px cards clip`).toBeLessThanOrEqual(width+1);
 }
});

test('desktop: reference layout dimensions stay unchanged',async({page})=>{
 await page.setViewportSize({width:1920,height:1080});
 await openAuthenticated(page,'/candidates');
 await expect(page.locator('.sidebar')).toHaveCSS('width','260px');
 await expect(page.locator('.brand')).toHaveCSS('font-size','22px');
 await expect(page.locator('.cards-grid')).toHaveCSS('grid-template-columns',/^(?:\d+(?:\.\d+)?px\s+){2}\d+(?:\.\d+)?px$/);
 await expect(page.locator('.candidate-card')).toHaveCount(9);
});

test('access code tabs and rows stay aligned across desktop widths',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('ceomentality:language','ru'));
 for(const width of [1280,1366,1440,1600,1920,2560]){
  await page.setViewportSize({width,height:900});
  await openAuthenticated(page,'/access-codes');
  const tabGeometry=await page.locator('.batch-tabs button').evaluateAll(buttons=>buttons.map(button=>({
   whiteSpace:getComputedStyle(button).whiteSpace,
   verticalOverflow:button.scrollHeight-button.clientHeight
  })));
  expect(tabGeometry.every(tab=>tab.whiteSpace==='nowrap'),`${width}px allows a batch tab to wrap`).toBe(true);
  expect(Math.max(...tabGeometry.map(tab=>tab.verticalOverflow)),`${width}px clips a batch tab`).toBeLessThanOrEqual(1);
  const rowOverflow=await page.locator('.batch-row').evaluateAll(rows=>rows.map(row=>row.scrollWidth-row.clientWidth));
  expect(Math.max(...rowOverflow),`${width}px overflows a batch row`).toBeLessThanOrEqual(1);
  const separators=await page.locator('.batch-row > div:nth-child(2)').evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().right));
  expect(Math.max(...separators)-Math.min(...separators),`${width}px misaligns row separators`).toBeLessThanOrEqual(1);
 }
});

test('recent code activity uses a complete bordered grid',async({page})=>{
 await page.setViewportSize({width:1366,height:900});
 await openAuthenticated(page,'/access-codes');
 const list=page.locator('.activity-list');
 const geometry=await list.evaluate(element=>({clientHeight:element.clientHeight,scrollHeight:element.scrollHeight}));
 expect(geometry.scrollHeight).toBeLessThanOrEqual(geometry.clientHeight);
 await expect(list).toHaveCSS('border-top-style','solid');
 await expect(page.locator('.activity-row').first()).toHaveCSS('border-bottom-style','solid');
 await expect(page.locator('.activity-row')).toHaveCount(5);
});

test('every conversion chart tooltip stays readable, bounded and above the points',async({page})=>{
 await page.setViewportSize({width:1920,height:1080});
 await openAuthenticated(page,'/analytics');
 const panel=await page.locator('.line-panel').boundingBox();
 expect(panel).not.toBeNull();
 const points=page.locator('.point-hit');
 for(let index=0;index<await points.count();index++){
  const hitBox=await points.nth(index).boundingBox();
  expect(hitBox).not.toBeNull();
  await page.mouse.move(hitBox!.x+hitBox!.width/2,hitBox!.y+hitBox!.height/2);
  const tooltip=page.locator('.chart-tooltip');
  await expect(tooltip).toHaveCSS('opacity','1');
  const box=await tooltip.boundingBox();
  expect(box,`tooltip ${index+1} is missing`).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(135);
  expect(box!.height).toBeGreaterThanOrEqual(56);
  expect(box!.x,`tooltip ${index+1} escapes left`).toBeGreaterThanOrEqual(panel!.x);
  expect(box!.x+box!.width,`tooltip ${index+1} escapes right`).toBeLessThanOrEqual(panel!.x+panel!.width);
  expect(await page.locator('.chart svg').evaluate(svg=>svg.lastElementChild?.classList.contains('chart-tooltip'))).toBe(true);
 }
});
