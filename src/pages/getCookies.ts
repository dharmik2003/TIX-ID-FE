import React from "react";

const getCookies = (name:string) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      const cookieValue = cookie.substring(name.length + 1);
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export default getCookies;
