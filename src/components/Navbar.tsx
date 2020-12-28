import React from 'react'

export const Navbar: React.FC = () => (
    <nav>
        <div className="nav-wrapper orange darken-3 px1">
          <a href="/" className="brand-logo">React + Typescript</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/">Список дел</a></li>
            <li><a href="/">О нас</a></li>
          </ul>
        </div>
    </nav>
)