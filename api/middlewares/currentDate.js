// export default function getDate() {
//   const currentDate = new Date();
//   const FormattedDate = currentDate.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
//   return FormattedDate;
// }

export default function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
