import React from 'react';
import "./Contact.css";

export const Contact = () => {
  let root = document.getElementById("root")
  root.style.opacity = 0.3
  setTimeout(() =>{
    root.style.opacity = 1
  },500)
  return (
    <div>
        <div>Contact</div>
    </div>
  )
}