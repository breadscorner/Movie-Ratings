export async function fetchMovies() {
  const response = await fetch("/api/Movies");
  const data = await response.json();
  return(data);
}
