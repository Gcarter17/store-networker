import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {

  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        # of shifts needing coverage
      </Typography>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />
      {/* <Typography id="discrete-slider" gutterBottom>
        Disabled
      </Typography>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
        disabled
      /> */}
    </div>
  );
}