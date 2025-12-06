
import { connectDB, model } from '@/database';

export default async function Page({ params }) {
  await connectDB();

  const doc = await model.findOne({ key: params.key });

  if (!doc || !doc.analytics) {
    return <div>No data found for key: {params.key}</div>;
  }

  const visits = doc.analytics;

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', background: '#f9f9f9' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
        Analytics → <strong>{params.key}</strong>
      </h1>
      <p style={{ marginBottom: '20px' }}>
        <strong>Redirects to:</strong>{' '}
        <a href={doc.url} target="_blank" style={{ color: 'blue' }}>
          {doc.url}
        </a>
      </p>
      <p style={{ fontSize: '20px', marginBottom: '30px' }}>
        <strong>Total visits:</strong> {visits.length}
      </p>

      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        All Visits
      </h2>

      {visits.length === 0 ? (
        <p>No visits recorded yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#222', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Time</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>IP</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Browser</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>OS</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Screen</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((v, i) => {
              const time = v.timestamp
                ? new Date(v.timestamp).toLocaleString()
                : '—';

              return (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? '#fff' : '#f1f1f1',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  <td style={{ padding: '12px' }}>{time}</td>
                  <td style={{ padding: '12px', fontFamily: 'monospace' }}>
                    {v.ip || '—'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {v.city || '—'}, {v.country || '—'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {v.browser?.name || '—'} {v.browser?.version || ''}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {v.os?.name || '—'} {v.os?.version || ''}
                  </td>
                  <td style={{ padding: '12px' }}>{v.screen || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
