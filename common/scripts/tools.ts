export default function isProd(url: String): Boolean {
  return !(
    url.includes("//dev.") ||
    url.includes("localhost") ||
    url.includes("127.0.0.1") ||
    url.includes("0.0.0.0")
  );
}
