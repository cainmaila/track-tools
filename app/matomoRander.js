//PAT Matomo 動態產生js
exports.matomoRander = (req, res) => {
  if (!process.env.MATOMO || process.env.MATOMO === undefined) {
    res.type('.js').send(`console.info("MATOMO is undefined")`)
    return
  }
  res.type('.js').send(`var _paq = window._paq || []
      _paq.push(['trackPageView'])
      _paq.push(['enableLinkTracking'])
      ;(function() {
        var u = '${process.env.MATOMO}'
        _paq.push(['setTrackerUrl', u + 'matomo.php'])
        _paq.push(['setSiteId', '${process.env.MATOMO_ID || '1'}'])
        var d = document,
          g = d.createElement('script'),
          s = d.getElementsByTagName('script')[0]
        g.type = 'text/javascript'
        g.async = true
        g.defer = true
        g.src = u + 'matomo.js'
        s.parentNode.insertBefore(g, s)
      })()`)
}
