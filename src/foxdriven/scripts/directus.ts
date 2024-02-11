import { atom } from "nanostores";
import { createDirectus, rest, authentication } from "@directus/sdk";

const cms_url = await import.meta.env.CMS_URL;
const cms_user = await import.meta.env.CMS_USER;
const cms_password = await import.meta.env.CMS_PASSWORD;

const client = createDirectus(cms_url)
  .with(authentication("json"))
  .with(rest());
const result = await client.login(cms_user, cms_password);

export const directusClient = client;
export const $refreshToken = atom(result["refresh_token"]?.toString());
