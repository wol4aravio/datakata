import { atom } from "nanostores";
import {
  createDirectus,
  rest,
  authentication,
  readItems,
  refresh,
} from "@directus/sdk";

const cms_url = await import.meta.env.CMS_URL;
const cms_user = await import.meta.env.CMS_USER;
const cms_password = await import.meta.env.CMS_PASSWORD;

const client = createDirectus(cms_url)
  .with(authentication("json"))
  .with(rest());
const result = await client.login(cms_user, cms_password);

export const directusClient = client;
export const $refreshToken = atom(result["refresh_token"]?.toString());

export async function getArticles(isProd: Boolean) {
  let articles: Record<string, any>[] = [];
  let query = {};

  if (isProd) {
    query = {
      filter: {
        prod: {
          _eq: true,
        },
      },
      sort: ["-year", "title"],
    };
  } else {
    query = {
      sort: ["-year", "title"],
    };
  }

  let failed = false;
  try {
    articles = await directusClient.request(readItems("articles", query));
  } catch (e) {
    const result = await directusClient.request(
      refresh("json", $refreshToken.get()),
    );
    $refreshToken.set(result["refresh_token"]?.toString());
    failed = true;
  } finally {
    if (failed) {
      articles = await directusClient.request(readItems("articles", query));
    }
  }
  return articles;
}
