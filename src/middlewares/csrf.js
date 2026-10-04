/*
 * CSRF defense for cookie-authenticated requests (defense in depth on top of `SameSite=Strict`).
 *
 * Browsers always attach an `Origin` / `Sec-Fetch-Site` header to cross-origin state-changing requests,
 * so a request that carries the auth cookie AND is provably cross-origin is rejected.
 * Non-browser clients (curl, Postman, server-to-server) send neither header and are unaffected,
 * and requests authenticated with the `token` header can't be forged by a browser, so they are skipped.
 *
 * Set ALLOWED_ORIGINS (comma separated, e.g. https://app.example.com) to trust a separate frontend origin.
 */
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const csrfOriginCheck = (req, res, next) => {
  if (SAFE_METHODS.has(req.method) || !req.cookies?.accessToken) return next()

  const origin = req.get('origin')
  if (origin && allowedOrigins.includes(origin)) return next()

  const fetchSite = req.get('sec-fetch-site')
  let crossOrigin = false
  if (fetchSite) {
    crossOrigin = fetchSite !== 'same-origin' && fetchSite !== 'none'
  } else if (origin) {
    // Older browsers without Fetch Metadata: compare the Origin host with the Host header
    try {
      crossOrigin = new URL(origin).host !== (req.get('x-forwarded-host') || req.get('host'))
    } catch {
      crossOrigin = true // malformed Origin
    }
  }

  if (crossOrigin) {
    console.log('Blocked cross-origin request that carried the auth cookie')
    return res.status(403).json({ success: false, message: 'Cross-origin request blocked' })
  }
  next()
}

module.exports = { csrfOriginCheck }
