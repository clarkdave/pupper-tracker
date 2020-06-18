import React, { useState } from 'react'
import { TrackerBody } from '../pages/api/tracker'
import classNames from 'classnames'

export const ActionButton: React.FC<{
  kind: TrackerBody['kind']
  location: TrackerBody['location']
}> = ({ kind, location }) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const emoji = kind === 'Pee' ? '💧' : '💩'

  const reset = () => {
    setSubmitting(false)
    setSuccess(false)
  }

  const submit = async () => {
    if (submitting || success) return

    setSubmitting(true)

    const body: TrackerBody = { kind, location }
    const res = await fetch('/api/tracker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      alert('Request failed')
      reset()
      return
    }

    setSubmitting(false)
    setSuccess(true)
    setTimeout(() => reset(), 3000)
  }

  return (
    <>
      <a
        onClick={() => {
          submit().catch(console.error)
        }}
        className={classNames({ submitting, success })}>
        {emoji}
        <div className="spinner"></div>
      </a>
      <style jsx>{`
        a {
          cursor: pointer;
          user-select: none;
          font-size: 1.8rem;
          background-color: #fafafa;
          padding: 5px 15px;
          border-radius: 5px;
          position: relative;
          transition: color 0.1s, background-color 0.3s;
        }

        a:active {
          background-color: #dfdfdf;
        }

        a.submitting {
          color: transparent;
          pointer-events: none;
        }

        a.success {
          background-color: rgba(174, 218, 163, 0.3);
          pointer-events: none;
        }

        @keyframes spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .spinner {
          position: absolute;
          left: 50%;
          top: 50%;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.1s;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid #ddd;
          border-left: 3px solid #555;
          animation: spin 1.1s infinite linear;
        }

        .spinner:after {
          border-radius: 50%;
          width: 10em;
          height: 10em;
        }

        a.submitting > .spinner {
          opacity: 1;
        }
      `}</style>
    </>
  )
}
