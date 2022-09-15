import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from '../hooks/window-hook';

const Layout = () => {
      // Window Size
      const { width } = useWindowDimensions();

      // App path
      const path = window.location.pathname;

      // Mobile Layouta
      if (width <= 1023) {
            return;
      }

      // Desktop Layout
      if (width >= 1024) {
            switch (path) {
                  case '/':
                        return;
                  // break;
                  case '/login':
                        return;
                  // break;
                  case '/signup':
                        return;
                  // break;
                  default:
                        return;
            }
      }
};

export default Layout;
