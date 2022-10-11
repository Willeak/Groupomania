import React, { useEffect, useState } from 'react';

const Darkmod = () => {
      // darkmod default value = false
      const [active, setActive] = useState();
      // au chargement si le localstorage comporteun item darkmod true demarrer le darkmod
      useEffect(() => {
            if (localStorage.getItem('DarkMod')) {
                  setActive(localStorage.getItem('DarkMod'));
                  document.body.setAttribute(
                        'theme',
                        active ? 'light' : 'dark'
                  );
            }
      }, []);
      //fonction au click qui declenche le darmod ou le reset
      const DarkMod = async (e) => {
            //si l'item est egale a null au click set la valeur sur true
            if (localStorage.getItem('DarkMod') === null) {
                  const checked = e.target.checked;
                  localStorage.setItem('DarkMod', checked);
                  document.body.setAttribute(
                        'theme',
                        active ? 'light' : 'dark'
                  );
                  //si au click l'item est sur true  clear le storage
            } else if (localStorage.getItem('DarkMod') === 'true') {
                  localStorage.removeItem('DarkMod');
                  window.location.reload();
            }
      };

      return (
            <div theme="light" className="darkmod" aria-label="bouton darkMod">
                  <input
                        type="checkbox"
                        id="theme-toggle"
                        className=""
                        defaultChecked={active}
                        onClick={(e) => DarkMod(e)}
                  />

                  <label htmlFor="theme-toggle"></label>
            </div>
      );
};

export default Darkmod;
