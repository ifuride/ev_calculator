import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <a className="logo" href="/#">
          <img className="logo__image" src="icons/fever_logo_2.svg" alt="Fever logo" />
        </a>
      </div>
    </header>
  )
};