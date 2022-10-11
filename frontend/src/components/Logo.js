import React from 'react';
// appel de l'image logo
import Logo1 from './../assets/icon-left-font.png';

const Logo = () => {
      //appel du logo
      return (
            <div>
                  <img
                        src={Logo1}
                        alt="logo Groupomania"
                        className="logo"
                        aria-label="logo de l'entreprise Groupomania"
                  />
            </div>
      );
};

export default Logo;
