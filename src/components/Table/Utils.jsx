import * as React from "react";
import { render } from "react-dom";

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isSameArray(a, b) {
  let i = a && a.length ? a.length : 0;
  if (i !== (b && b.length ? b.length : 0)) {
    return false;
  }
  while (i--) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function stringifyCensor(censor) {
  let i = 0;
  return function (key, value) {
    if (
      i !== 0 &&
      typeof censor === "object" &&
      typeof value == "object" &&
      censor === value
    ) {
      return "[Circular]";
    }
    if (i >= 29) {
   
      return "[Unknown]";
    }
    ++i; 
    return value;
  };
}

export function isSameObject(a, b) {
  return (
    JSON.stringify(a, stringifyCensor(a)) ===
    JSON.stringify(b, stringifyCensor(b))
  );
}

export function reactFormatter(JSX) {
  return function customFormatter(cell, formatterParams, onRendered) {
    const renderFn = () => {
      const cellEl = cell.getElement();
      if (cellEl) {
        const formatterCell = cellEl.querySelector(".formatterCell");
        if (formatterCell) {
          const CompWithMoreProps = React.cloneElement(JSX, { cell });
          render(CompWithMoreProps, cellEl.querySelector(".formatterCell"));
        }
      }
    };

    onRendered(renderFn);
    setTimeout(() => {
      renderFn();
    }, 0);
    return '<div class="formatterCell"></div>';
  };
}
