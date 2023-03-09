export const formatLabel = (label) => {
  const str = label.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1)
}