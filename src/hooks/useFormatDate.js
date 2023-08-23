export function useFormatDate() {
  const formatDate = (date = null) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  return { formatDate };
}
