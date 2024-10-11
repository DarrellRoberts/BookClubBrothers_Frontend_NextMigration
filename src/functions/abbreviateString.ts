const abbreviateString = (title: string) => {
  let abbLabel: string = "";
  const arr: string[] = title.split(" ");
  for (let i = 0; i < arr.length; i++) {
    abbLabel = abbLabel + arr[i][0];
  }
  return abbLabel;
};

export { abbreviateString };