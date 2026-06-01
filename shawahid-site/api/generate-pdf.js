import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  let browser;
  try {
    const params = req.query;
    
    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--font-render-hinting=none',
        '--disable-dev-shm-usage'
      ],
      defaultViewport: { width: 794, height: 1123 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    
    const page = await browser.newPage();
    
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const queryString = new URLSearchParams(params).toString();
    const previewUrl = `${protocol}://${host}/preview.html?${queryString}`;
    
    // domcontentloaded أسرع من networkidle0
    await page.goto(previewUrl, { 
      waitUntil: 'domcontentloaded', 
      timeout: 40000 
    });
    
    // ننتظر الخطوط
    await page.evaluateHandle('document.fonts.ready');
    
    // ننتظر تطبيق البيانات (preview.html يقرأ params ويطبقها)
    await new Promise(r => setTimeout(r, 1500));
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });
    
    await browser.close();
    browser = null;
    
    const teacherName = (params.teacher || 'preview')
      .replace(/[^\w\s\u0600-\u06FF]/g, '')
      .trim() || 'preview';
    const filename = `shawahid-${teacherName.replace(/\s+/g, '-')}.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition', 
      `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`
    );
    res.setHeader('Cache-Control', 'no-cache');
    res.send(Buffer.from(pdf));
  } catch (e) {
    if (browser) await browser.close().catch(() => {});
    console.error('PDF error:', e);
    res.status(500).json({ error: e.message });
  }
}
