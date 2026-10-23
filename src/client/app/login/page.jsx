"use client";

import { useRef, useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(event) {
    const emailDigitado = email.current.value.trim();
    const senhaDigitada = password.current.value;

    if (!emailDigitado || !senhaDigitada) {
      setMensagem("Preencha o e-mail e a senha!");
      return;
    }

    setMensagem("");
    setCarregando(true);

    if (resposta.status === 401) {
      setMensagem("E-mail ou senha inválidos!");
      return;
    }

    if (resposta.status === 429) {
      setMensagem("Muitas tentativas. Tente novamente mais tarde.");
      return;
    }

    if (!resposta.ok) {
      setMensagem("Erro ao realizar login.");
      return;
    }
  }

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.voltarHome}>
        <span>←</span>
        Voltar para Home
      </Link>

      <div className={styles.tableGlow} aria-hidden="true" />

      {/* Cartas decorativas */}
      <div
        className={`${styles.playingCard} ${styles.cardOne}`}
        aria-hidden="true"
      >
        <span>A</span>
        <strong>♠</strong>
        <span>A</span>
      </div>

      <div
        className={`${styles.playingCard} ${styles.cardTwo}`}
        aria-hidden="true"
      >
        <span>K</span>
        <strong>♥</strong>
        <span>K</span>
      </div>

      <div
        className={`${styles.playingCard} ${styles.cardThree}`}
        aria-hidden="true"
      >
        <span>J</span>
        <strong>♣</strong>
        <span>J</span>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span>♠</span>
            BLACKJACK GAME
            <span>♥</span>
          </div>

          <h1>Bem-vindo</h1>
          <p>Faça login para continuar sua partida.</p>
        </header>

        <form onSubmit={cadastrar} className={styles.form}>
          <div className={styles.formHeader}>
            <span className={styles.cardSymbol}>♠</span>
            <h2>LOGIN</h2>
            <span className={styles.cardSymbol}>♠</span>
          </div>

          <div className={styles.campo}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              ref={email}
              placeholder="seu@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              ref={password}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" disabled={carregando} className={styles.button}>
            {carregando ? "Entrando..." : "ENTRAR →"}
          </button>

          {mensagem && (
            <p className={styles.mensagem} role="alert">
              {mensagem}
            </p>
          )}

          <p className={styles.formFooter}>
            ♠ Sua próxima partida começa aqui ♠
          </p>
        </form>

        <footer className={styles.footer}>
          BLACKJACK <span>•</span> 21 <span>•</span> GAME
        </footer>
      </div>
    </main>
  );
}
