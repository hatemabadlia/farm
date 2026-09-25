import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Modules from '../pages/Modules/Modules';
import Demos from '../pages/Demos/Demos';
import Testimonials from '../pages/Testimonials/Testimonials';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import NotFound from '../pages/NotFound/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/demos" element={<Demos />} />
      <Route path="/temoignages" element={<Testimonials />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      {/* Attrape toutes les URL inconnues : avant, on tombait sur une page
          blanche sous la navbar. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
