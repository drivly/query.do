import qs from 'qs'

export default {
  fetch: async (req, env) => {
    
    const { user, redirect, body } = await env.CTX.fetch(req).then(res => res.json())
    if (redirect) return Response.redirect(redirect)
    
    const { origin, pathname, search } = new URL(req.url)
    
    const data = (pathname === '/parse' || pathname === '/api') ? undefined : await fetch('https:/' + (pathname === '/:url' ? '/json.fyi/people.json' : pathname)).then(res => res.json())
 
    return new Response(JSON.stringify({
      api: {
        icon: '🔎',
        name: 'query.do',
        description: 'Query String Parsing & Generation API',
        url: 'https://query.do',
        api: 'https://query.do/api',
        endpoints: {
          parse: origin + '/parse?prop=value',
          generate: origin + '/:url',
        },
        type: 'https://utilities.do',
        repo: 'https://github.com/drivly/query.do',
      },
      decoded: qs.parse(search, { ignoreQueryPrefix: true }),
      encoded: origin + '/parse' + (search === "" ? qs.stringify(data ?? body, { encode: false, addQueryPrefix: true, format: 'RFC1738' }) : decodeURI(search)),
      user,
    }, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  }
}
