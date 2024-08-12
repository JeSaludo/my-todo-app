export async function PostCard() {
  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(card),
  });

  const data = await response.json();
  return data;
}
