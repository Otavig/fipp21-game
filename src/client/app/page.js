
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.tableGlow} aria-hidden="true" />

      {/* Menu superior */}
      <header className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <span>♠</span>
          BLACKJACK <strong>GAME</strong>
        </Link>

        <nav className={styles.nav}>
          <Link href="/login" className={styles.navLink}>
            Login
          </Link>

          <Link href="/usuario" className={styles.profileButton}>
            Meu perfil
          </Link>
        </nav>
      </header>

      {/* Cartas decorativas do fundo */}
      <div
        className={`${styles.playingCard} ${styles.cardLeft}`}
        aria-hidden="true"
      >
        <span>Q</span>
        <strong>♥</strong>
        <span>Q</span>
      </div>

      <div
        className={`${styles.playingCard} ${styles.cardRight}`}
        aria-hidden="true"
      >
        <span>J</span>
        <strong>♣</strong>
        <span>J</span>
      </div>

      {/* Conteúdo principal */}
      <section className={styles.hero}>
        <div className={styles.badge}>
          ♠ BEM-VINDO À MESA ♠
        </div>

        <h1>
          A sorte está
          <br />
          <span>nas suas cartas.</span>
        </h1>

        <p className={styles.description}>
          Desafie seus amigos, monte sua estratégia e
          tente chegar ao número mais desejado da mesa.
        </p>

        {/* Cartas principais */}
        <div className={styles.cards}>
          <div className={`${styles.heroCard} ${styles.ace}`}>
            <span>A</span>
            <strong>♠</strong>
            <span>A</span>
          </div>

          <div className={`${styles.heroCard} ${styles.king}`}>
            <span>K</span>
            <strong>♥</strong>
            <span>K</span>
          </div>

          <div className={styles.score}>
            <span>BLACKJACK</span>
            <strong>21</strong>
          </div>
        </div>

        {/* Menu principal */}
        <div className={styles.actions}>
          <Link href="/sala" className={styles.playButton}>
            <span className={styles.buttonIcon}>▶</span>
            JOGAR AGORA
          </Link>

          <Link href="/login" className={styles.roomButton}>
            ♠ ENTRAR NA CONTA
          </Link>
        </div>

        <p className={styles.hint}>
          Reúna seus amigos e prepare-se para a próxima rodada.
        </p>
      </section>

      <footer className={styles.footer}>
        <span>♠</span>
        BLACKJACK GAME
        <span>♥</span>
        <small>PROJETO ACADÊMICO</small>
      </footer>
    </main>
  );
}
