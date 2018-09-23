import * as React from 'react';

let counter = 0;
function globalKeyGenerator() {
  counter = counter + 1;
  return counter;
}

function getRenderFunctionFor(ComponentToRender) {
  return function (
    currentDataToRender,
    index,
    assigns
  ) {
    console.log(currentDataToRender);
    console.log(index);
    console.log(assigns);
    const key = `render_many_${globalKeyGenerator()}`;
    return (
      <ComponentToRender
        index={index}
        assigns={assigns}
        key={key}
        {...currentDataToRender}
      />
    );
  };
}

export function renderMany(
  ComponentAsView,
  objectsToIterateOver,
  assigns,
) {

  const copy = new Array(objectsToIterateOver.length);
  const ourMapper = getRenderFunctionFor(ComponentAsView);

  for (let [index, item] of objectsToIterateOver.entries()) {
    copy[index] = ourMapper(item, index, assigns);
  }

  return copy;
}