export function authMiddleware(...allowedRoles: string[]) {
    return (req:any, resp:any, next:any) => {
      const role = req.session && req.session.role;
      if (role) {
        if (allowedRoles.some(allowedRole => role === allowedRole)) {
          next(); // allow the call to continue on to the next middleware to process the request
        } else {
          resp.sendStatus(403); // does not have proper permissions
        }
      } else {
        resp.sendStatus(401); // no authentication info present
      }
    };
  }

export function authUsername(username: string, sessionname: string) {
  return username === sessionname;
}