'use client'

import { CSSProperties, useState } from 'react'

export default function Home() {
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [somatic, setSomatic] = useState('')
  const [medications, setMedications] = useState([''])

  const addMedication = () => {
    setMedications([...medications, ''])
  }

  const updateMedication = (index: number, value: string) => {
    const copy = [...medications]
    copy[index] = value
    setMedications(copy)
  }

  const handleSubmit = () => {
    const data = {
      gender,
      age,
      diagnosis,
      somatic,
      medications,
    }

    console.log(data)
    alert('Данные отправлены. Здесь будет расчёт побочек.')
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="/logo.png" alt="logo" style={styles.logo} />
        <h1>Проверка побочных эффектов</h1>
      </div>

      {/* Row 1 */}
      <div style={styles.row}>
        <select value={gender} onChange={e => setGender(e.target.value)} style={styles.input}>
          <option value="">Пол</option>
          <option value="female">Женский</option>
          <option value="male">Мужской</option>
        </select>

        <select value={age} onChange={e => setAge(e.target.value)} style={styles.input}>
          <option value="">Возраст</option>
          <option value="18-25">18–25</option>
          <option value="26-40">26–40</option>
          <option value="41-60">41–60</option>
          <option value="60+">60+</option>
        </select>

        <select value={diagnosis} onChange={e => setDiagnosis(e.target.value)} style={styles.input}>
          <option value="">Психиатрический диагноз</option>
          <option value="depression">Депрессия</option>
          <option value="bipolar">БАР</option>
          <option value="schizophrenia">Шизофрения</option>
          <option value="anxiety">Тревожное расстройство</option>
        </select>
      </div>

      {/* Row 2 */}
      <div style={styles.column}>
        <label>Сопутствующие соматические патологии</label>
        <input
          value={somatic}
          onChange={e => setSomatic(e.target.value)}
          placeholder="Например: гипертония, диабет"
          style={styles.input}
        />
      </div>

      {/* Row 3 */}
      <div style={styles.column}>
        <label>Лекарственные препараты</label>

        {medications.map((med, i) => (
          <input
            key={i}
            value={med}
            onChange={e => updateMedication(i, e.target.value)}
            placeholder="Введите препарат"
            style={styles.input}
          />
        ))}

        <button onClick={addMedication} style={styles.secondaryButton}>
          + Добавить ещё
        </button>
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} style={styles.primaryButton}>
        Оценить возможные побочные эффекты
      </button>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: 24,
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 50,
    height: 50,
  },
  row: {
    display: 'flex',
    gap: 12,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ccc',
    width: '100%',
  },
  primaryButton: {
    padding: 14,
    background: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontSize: 16,
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: 10,
    background: '#E5E7EB',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
}
