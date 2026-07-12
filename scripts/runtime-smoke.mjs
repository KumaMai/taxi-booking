const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const routes = ["/api/health", "/", "/booking", "/about", "/contact", "/price-list", "/qa", "/reviews", "/travel", "/admin/login", "/api/auth/session"];

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  if (response.status !== 200) throw new Error(`${route} returned ${response.status}`);
  console.log(`${route} ${response.status}`);
}

const invalidBooking = await fetch(`${baseUrl}/api/booking`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{}",
});

if (invalidBooking.status !== 400) throw new Error(`/api/booking invalid payload returned ${invalidBooking.status}`);
console.log(`/api/booking invalid payload ${invalidBooking.status}`);
