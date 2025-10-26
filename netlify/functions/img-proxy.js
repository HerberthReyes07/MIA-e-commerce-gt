/* Netlify Function: Proxy images from backend and add ngrok bypass header */

exports.handler = async function (event) {
  try {
    const path = event.queryStringParameters?.path || '';
    if (!path) {
      return { statusCode: 400, body: 'Missing "path" query param' };
    }
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    const base = process.env.API_BASE_URL || 'https://bennett-smartish-waterlessly.ngrok-free.dev';
    const target = new URL(normalizedPath, base).toString();

    const resp = await fetch(target, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    });

    const contentType = resp.headers.get('content-type') || 'application/octet-stream';

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      return {
        statusCode: resp.status,
        headers: { 'content-type': contentType },
        body: text || `Upstream error ${resp.status}`,
      };
    }

    const arrayBuffer = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      statusCode: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=3600',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (e) {
    return { statusCode: 500, body: 'Proxy error' };
  }
}
