import { createReadStream, promises as fs } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve, sep } from "node:path";

const root = resolve(process.env.STATIC_ROOT || "public");
const port = Number(process.env.PORT || 3001);
const mime = {
  ".avif": "image/avif", ".css": "text/css; charset=utf-8", ".ico": "image/x-icon",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".mp4": "video/mp4", ".png": "image/png",
  ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8", ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
    const file = resolve(root, `.${normalize(pathname)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error("invalid path");
    const stat = await fs.stat(file);
    if (!stat.isFile()) throw new Error("not a file");
    const headers = {
      "Accept-Ranges": "bytes",
      "Cache-Control": pathname === "/assets/site-sw.js" ? "no-cache" : "public, max-age=31536000, immutable",
      "Content-Type": mime[extname(file).toLowerCase()] || "application/octet-stream",
      ...(pathname === "/assets/site-sw.js" ? { "Service-Worker-Allowed": "/" } : {}),
    };
    const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range || "");
    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
      if (start > end || start >= stat.size) {
        response.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
        return response.end();
      }
      response.writeHead(206, { ...headers, "Content-Length": end - start + 1, "Content-Range": `bytes ${start}-${end}/${stat.size}` });
      if (request.method === "HEAD") return response.end();
      return createReadStream(file, { start, end }).pipe(response);
    }
    response.writeHead(200, { ...headers, "Content-Length": stat.size });
    if (request.method === "HEAD") return response.end();
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "0.0.0.0", () => console.log(`Static assets listening on ${port}`));
