export async function getList() {
  try {
    const res = await fetch("http://localhost:3001/getList");
    const text = await res.text();
    console.log("🔍 raw response:", text);
    const data = text ? JSON.parse(text) : [];
    console.log("✅ parsed:", data);
    return data;
  } catch (err) {
    console.error("🐭 pu-pu-pu, error in getList:", err);
    throw err;
  }
}
