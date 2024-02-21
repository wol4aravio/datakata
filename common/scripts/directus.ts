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

async function getElementsFromCollection(
  isProd: Boolean,
  collectionName: string,
  sortFields: Array<string>,
): Promise<Record<string, any>[]> {
  let elements: Record<string, any>[] = [];
  let query = {};

  if (isProd) {
    query = {
      filter: {
        prod: {
          _eq: true,
        },
      },
      sort: sortFields,
    };
  } else {
    query = {
      sort: sortFields,
    };
  }

  let failed = false;
  try {
    elements = await directusClient.request(readItems(collectionName, query));
  } catch (e) {
    const result = await directusClient.request(
      refresh("json", $refreshToken.get()),
    );
    $refreshToken.set(result["refresh_token"]?.toString());
    failed = true;
  } finally {
    if (failed) {
      elements = await directusClient.request(readItems(collectionName, query));
    }
  }
  return elements;
}

export async function getArticles(
  isProd: Boolean,
): Promise<Record<string, any>[]> {
  return getElementsFromCollection(isProd, "articles", ["-year", "title"]);
}

export async function getAlgorithms(
  isProd: Boolean,
): Promise<Record<string, any>[]> {
  return getElementsFromCollection(isProd, "name", ["algorithmsz"]);
}
