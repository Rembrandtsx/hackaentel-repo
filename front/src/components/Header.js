import React from "react";

export default function Header() {
  return (
    <header>
      <nav>
        <a href="#">
          <svg
            width="58"
            height="44"
            viewBox="0 0 58 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.6492 2.88374C48.0078 2.41862 46.9084 2.51165 46.3587 3.06979L42.5107 6.60467C41.961 7.16281 41.961 8.00002 42.6023 8.46514C42.6023 8.46514 48.4659 12.8372 48.4659 22.3256C48.4659 31.2558 42.2358 36.4651 42.2358 36.4651C41.5945 37.0233 41.5945 37.8605 42.1442 38.4186L45.9006 41.9535C46.4503 42.5116 47.5497 42.6047 48.1911 42.1396C48.1911 42.1396 57.0781 36 57.0781 22.4186C57.2613 8.83723 48.6492 2.88374 48.6492 2.88374Z"
              fill="#FF560A"
            />
            <path
              d="M12.0021 25.3023C12.0021 25.3023 10.9026 25.2093 10.9026 26.1395C10.9026 31.2558 14.659 34.8837 20.5226 34.8837C24.9203 34.8837 26.7527 33.8605 29.4096 31.814C30.051 31.3488 30.6923 30.8837 31.1504 31.4419C31.5169 31.814 36.0978 36.1861 36.0978 36.1861C36.6475 36.7442 36.5559 37.3953 35.9146 37.9535C35.2732 38.5116 28.4018 44 20.431 44C9.98645 44 0 39.3488 0 21.9535C0 7.90698 7.7876 0 19.24 0C31.5169 0 38.4799 8.74419 38.4799 20.5581V23.5349C38.4799 24.7442 37.4721 25.3023 36.7391 25.3023H12.0021ZM26.5695 13.3953C25.3784 10.8837 22.9047 8.93023 19.24 8.93023C15.4836 8.93023 13.1015 10.7907 11.9104 13.3953C11.2691 14.9767 10.9943 16.093 10.9026 18.0465H27.6689C27.4856 16.093 27.3024 14.9767 26.5695 13.3953Z"
              fill="white"
            />
          </svg>
        </a>
        <ul>
          <a href="#como-funciona">
            <li>¿Cómo funciona?</li>
          </a>
          <a href="#plan">
            <li>El plan</li>
          </a>
        </ul>
      </nav>
    </header>
  );
}
