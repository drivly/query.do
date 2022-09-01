import qs from 'qs'

export default {
  fetch: async (req, env) => {
    
    const { user } = await env.CTX.fetch(req).then(res => res.json())
    const { origin, pathname, search } = new URL(req.url)
    
    const data = pathname === '/parse') ? undefined : await fetch('https:/' + pathname).then(res => res.json())
 
    return new Response(JSON.stringify({
      api: {
        icon: '🔎',
        name: 'query.do',
        description: 'Query String Parsing & Generation API',
        url: 'https://query.do',
        endpoints: {
          parse: origin + '/parse?prop=value',
          generate: origin + '/:url',
        },
        memberOf: 'https://primitives.do',
      },
      query: qs.parse(search, { ignoreQueryPrefix: true }),
      data: data,
      user,
    }, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  }
}
