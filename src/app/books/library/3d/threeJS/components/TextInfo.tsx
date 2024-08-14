import React from 'react';

type Props = {
  readBooks: object[]
}

export default function TextInfo({readBooks}: Props) {
  console.log(readBooks);
  return (
    <div>TextInfo</div>
  );
}
