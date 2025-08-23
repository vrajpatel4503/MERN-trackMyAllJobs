import { toast } from "react-toastify";
import { MdCheckCircle, MdError } from "react-icons/md";

// Toast for success
export const showSuccessToast = (message) => {
  toast.success(message || "Success", {
    icon: <MdCheckCircle />,
    // className: "!bg-zinc-900 !text-white",
    // progressClassName: "!bg-amber-400",
    autoClose: 1000,
  });
};

// Toast for error
export const showErrorToast = (message) => {
  toast.error(message || "Something went wrong", {
    icon: <MdError />,
    // className: "!bg-zinc-900 !text-white",
    // progressClassName: "!bg-red-400",
    autoClose: 1500,
  });
};
