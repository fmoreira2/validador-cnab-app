const { contextBridge } = require("electron");
//import Toastify from "toastify-js";
const Toastify = require("toastify-js");

contextBridge.exposeInMainWorld("Toastify", {
  toast: (options) => Toastify(options).showToast(),
});
