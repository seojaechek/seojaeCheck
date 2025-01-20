export default function GetRevalidationTime() {
  const now = new Date();
  const setTime = new Date();
  setTime.setUTCHours(15, 0, 0);

  return (Date.parse(setTime.toString()) - Date.parse(now.toString())) / 1000;
}
