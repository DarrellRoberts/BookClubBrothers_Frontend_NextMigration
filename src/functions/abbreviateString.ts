const abbreviateString = (title: string) => {
  let abbLabel: string = "";
  const arr: string[] = title.split(" ");
  for (const word of arr) {
    abbLabel = abbLabel + word[0];
  }
  return abbLabel;
};

export { abbreviateString };