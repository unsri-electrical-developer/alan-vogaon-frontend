// export const formatRupiah = (angka, prefix) => {
//   if (angka > 999 && angka < 1000000 && prefix === undefined) {
//     return (angka / 1000).toFixed(1) + "K";
//   } else if (angka >= 1000000 && angka < 1000000000 && prefix === undefined) {
//     return (angka / 1000000).toFixed(1) + "Jt";
//   } else if (
//     angka >= 1000000000 &&
//     angka < 1000000000000 &&
//     prefix === undefined
//   ) {
//     return (angka / 1000000000).toFixed(1) + "T";
//   } else {
//     var number_string = angka.toString().replace(/[^,\d]/g, ""),
//       split = number_string.split(","),
//       sisa = split[0].length % 3,
//       rupiah = split[0].substr(0, sisa),
//       ribuan = split[0].substr(sisa).match(/\d{3}/gi);

//     // tambahkan titik jika yang di input sudah menjadi angka ribuan
//     if (ribuan) {
//       var separator = sisa ? "." : "";
//       rupiah += separator + ribuan.join(".");
//     }

//     rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
//     return prefix === undefined ? rupiah : rupiah ? "Rp" + rupiah : "";
//   }
// };

export const formatRupiah = (angka) => {
  return `Rp ${angka.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
};
