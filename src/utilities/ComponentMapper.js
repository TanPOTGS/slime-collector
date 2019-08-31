import React from 'react';

const ComponentMapper = ({array, component : Component, ...other}) => {
  return array.map(
    (item) => {
      return <Component key={item.id} name={item.name} {...other}/>;
    }
  );
}

export default ComponentMapper;