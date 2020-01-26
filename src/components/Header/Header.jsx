import React from "react";

const Header = function() {
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo-container">
          <img src="img/icon-1.png" className="header__logo" alt="Logo" />
        </div>

        <div className="header__search-container">
          <img
            src="img/icon-12.png"
            className="header__search-icon"
            alt="Magnifying glass"
          />
          <input type="text" className="header__input" placeholder="Search" />
        </div>
      </div>

      <div className="header__right">
        <div className="header__bell-container">
          <img
            src="img/icon-11.png"
            className="header__bell"
            alt="Notifications"
          />
        </div>

        <div className="header__avatar-container">
          <img
            src="img/avatar.png"
            className="header__avatar"
            alt="Current user"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
