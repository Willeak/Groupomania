import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const Disconnect = () => {
      return (
            <div>
                  <FontAwesomeIcon icon={faDoorOpen} className="icon" />
                  <button className="DisconnectButton">Déconnecter</button>
            </div>
      );
};

export default Disconnect;
