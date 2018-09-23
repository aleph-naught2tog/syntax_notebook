import * as React from 'react';

function* globalKeyGenerator() {
  let counter = 0;
  while (true) {
    counter = counter + 1;
    yield counter;
  }
}

const KeyGenerator = globalKeyGenerator();

class Bob {
  someProp = () => "hello";
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
    const key = `render_many_${KeyGenerator.next().value}`;
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