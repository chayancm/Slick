import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Header } from '../components';

const CustomColorPicker = ({ id, mode }) => {
  const [color, setColor] = useState('#fff');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.hex);
    document.getElementById('preview').style.backgroundColor = color.hex;
  };

  return (
    <div>
      <button onClick={handleClick}>Pick Color</button>
      {displayColorPicker ? <div style={{ position: 'absolute', zIndex: '2' }}>
        <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={handleClose} />
        <SketchPicker color={color} onChange={handleChange} />
      </div> : null}
    </div>
  );
};

const ColorPicker = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Color Picker" />
    <div className="text-center">
      <div id="preview" />
      <div className="flex justify-center items-center gap-20 flex-wrap">
        <div>
          <p className="text-2xl font-semibold mt-2 mb-4">Inline Pallete</p>
          <CustomColorPicker id="inline-palette" mode="Palette" />
        </div>
        <div>
          <p className="text-2xl font-semibold mt-2 mb-4">Inline Picker</p>
          <CustomColorPicker id="inline-picker" mode="Picker" />
        </div>
      </div>
    </div>
  </div>
);

export default ColorPicker;
