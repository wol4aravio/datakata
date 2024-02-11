import { createDirectus, rest, authentication } from "@directus/sdk";

const cms_url = await import.meta.env.CMS_URL;
const cms_user = await import.meta.env.CMS_USER;
const cms_password = await import.meta.env.CMS_PASSWORD;

const client = createDirectus(cms_url).with(rest()).with(authentication());
await client.login(cms_user, cms_password);

export const directusClient = client;
