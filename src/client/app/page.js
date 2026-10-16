import { Card } from 'antd';

export default function Home() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "gray",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh"
    }}>
      <Card title="Projeto de blackjack" variant="borderless" style={{ width: 300 }}>
          <p>Bem-vindo(a) a Home!</p>
       </Card>
    </div>
  );
}
