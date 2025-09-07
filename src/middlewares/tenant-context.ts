// Kein Import nötig – Strapi ist global verfügbar
export default (strapi: any) => {
  return async (ctx: any, next: () => Promise<any>) => {
    const host = ctx.get("host");
    const tenant = await strapi.db.query("api::tenant.tenant").findOne({
      where: { domains: { $contains: host } },
    });
    ctx.state.tenant = tenant;
    await next();
  };
};
// Diese Middleware extrahiert den Tenant basierend auf dem Hostnamen der Anfrage
// und hängt ihn an den Kontext (ctx.state.tenant) an.
