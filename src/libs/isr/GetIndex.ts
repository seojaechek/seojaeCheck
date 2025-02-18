export default function GetIndex() {
  const currentDate = new Date().getDate();

  if (currentDate === 31) {
    return 7;
  } else {
    return currentDate % 15;
  }
}
