import Swal from "sweetalert2";

export   const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
  });