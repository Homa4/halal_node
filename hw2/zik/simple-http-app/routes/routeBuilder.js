function Route(method, path, handler) {
    const parts = path.split('/').filter(Boolean);
  
    return {
      method,
      path,
      handler,
      match(requestMethod, requestPath) {
        if (requestMethod !== method) return false;
  
        const reqParts = requestPath.split('/').filter(Boolean);
        if (reqParts.length !== parts.length) return false;
  
        const params = {};
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].startsWith(':')) {
            const paramName = parts[i].substring(1);
            params[paramName] = reqParts[i];
          } else if (parts[i] !== reqParts[i]) {
            return false;
          }
        }
        return { params };
      }
    };
  }
  
  module.exports = { Route };