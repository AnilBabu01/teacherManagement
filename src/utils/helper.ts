type Designation = "HOD" | "VC" | "PVC" | "DEAN" | "FACULTY";

export const allowDesigantion = (designation: Designation): Designation[] => {
  if (designation === "HOD") {
    return ["FACULTY"];
  }
  if (designation === "DEAN") {
    return ["FACULTY", "HOD"];
  }
  if (designation === "PVC") {
    return ["FACULTY", "HOD", "DEAN"];
  }
  if (designation === "VC") {
    return ["FACULTY", "HOD", "DEAN", "PVC"];
  }
  return [];
};

// const loggedUser: {
//   desigantion: Designation;
// } = {
//   desigantion: "DEAN",
// };
// const updateUser: {
//   desigantion: Designation;
// } = {
//   desigantion: "FACULTY",
// };
// const isEditable = allowDesigantion(loggedUser.desigantion).includes(
//   updateUser.desigantion
// );
// if (!isEditable) {
//   throw "Not Allowed";
// }
