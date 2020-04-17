import React from 'react';
import './App.css';

import TabGallery from './components/TabGallery/TabGallery';
import img1 from './image/img1.jpg';
import img2 from './image/img2.jpg';
import img3 from './image/img3.jpg';

const collection = [
  { src: img1, caption: "Caption eleven" },
  { src: img2, caption: "Caption twelve" },
  { src: img3, caption: "Caption thirteen" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Tab Gallery</h2>
        <p>Click on each image below to show the corresponding image.</p>

        <TabGallery
          input={collection}
          ratio={`3:2`}
        />
      </div>
    );
  }
}