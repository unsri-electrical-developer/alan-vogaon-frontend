export function formatTanggal(dateString, type = " ") {
  const date = new Date(dateString);
  const year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  if (month == 1) month = "Januari";
  if (month == 2) month = "Februari";
  if (month == 3) month = "Maret";
  if (month == 4) month = "April";
  if (month == 5) month = "Mei";
  if (month == 6) month = "Juni";
  if (month == 7) month = "Juli";
  if (month == 8) month = "Agustus";
  if (month == 9) month = "September";
  if (month == 10) month = "Oktober";
  if (month == 11) month = "November";
  if (month == 12) month = "Desember";
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}${type}${month}${type}${year}`;
}
