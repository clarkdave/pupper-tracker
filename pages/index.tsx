import React from 'react'
import Head from 'next/head'
import { ActionButton } from '../components/ActionButton'

interface Props {
  dogName: string
}

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      dogName: process.env.DOG_NAME || 'Pupper',
    },
  }
}

const Home: React.FC<Props> = ({ dogName }) => {
  return (
    <div className="container">
      <Head>
        <title>{dogName} Tracker</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main>
        <h1>🐶 {dogName} Tracker</h1>

        <div className="track">
          <h2>Balcony 😍</h2>
          <div className="actions">
            <ActionButton kind="Pee" location="Balcony" />
            <ActionButton kind="Poop" location="Balcony" />
          </div>
        </div>

        <div className="track">
          <h2>Pad 😌</h2>
          <div className="actions">
            <ActionButton kind="Pee" location="Pad" />
            <ActionButton kind="Poop" location="Pad" />
          </div>
        </div>

        <div className="track">
          <h2>Floor 😢</h2>
          <div className="actions">
            <ActionButton kind="Pee" location="Floor" />
            <ActionButton kind="Poop" location="Floor" />
          </div>
        </div>

        <div className="track">
          <h2>Walk 🌱</h2>
          <div className="actions">
            <ActionButton kind="Pee" location="Walk" />
            <ActionButton kind="Poop" location="Walk" />
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        h1 {
          font-size: 2rem;
          margin: 2rem 0;
        }

        .track {
          margin-bottom: 2rem;
        }

        .track h2 {
          font-size: 1.3rem;
          text-align: center;
          margin: 0 0 1rem 0;
        }

        .actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 1.2rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #333;
          }

          h1,
          h2,
          h3 {
            color: white;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
