import React, { useEffect, useState } from 'react';

const Darkmod = () => {
      // darkmod default value = false

      const [active, setActive] = useState();
      console.log(active);

      useEffect(() => {
            if (localStorage.getItem('DarkMod')) {
                  setActive(localStorage.getItem('DarkMod'));
                  document.body.setAttribute(
                        'theme',
                        active ? 'light' : 'dark'
                  );
            }
      }, []);

      const test = async (e) => {
            if (localStorage.getItem('DarkMod') === null) {
                  const checked = e.target.checked;
                  localStorage.setItem('DarkMod', checked);
                  document.body.setAttribute(
                        'theme',
                        active ? 'light' : 'dark'
                  );
            } else if (localStorage.getItem('DarkMod') === 'true') {
                  localStorage.removeItem('DarkMod');
                  window.location.reload();
            }
            // const DarkMod = localStorage.getItem('DarkMod');

            // document.body.setAttribute('theme', active ? 'light' : 'dark');
            console.log(active);
      };

      return (
            <div theme="light" className="darkmod">
                  <input
                        type="checkbox"
                        id="theme-toggle"
                        className=""
                        defaultChecked={active}
                        onClick={(e) => test(e)}
                  />
                  <label htmlFor="theme-toggle"></label>
            </div>
      );
};

export default Darkmod;
