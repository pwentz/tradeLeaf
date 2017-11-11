export function findById(item, items) {
  const index = (items || []).findIndex(cand => cand.id == item.id);
  return index >= 0 ? items[index] : undefined;
};
