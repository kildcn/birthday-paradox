import React, { useState } from 'react';
import { AlertCircle, Users, Calculator, Play, RefreshCw } from 'lucide-react';

// Styles remain the same as in the previous implementation
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '2rem'
  },
  mainWrapper: {
    maxWidth: '64rem',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  description: {
    color: '#4b5563',
    marginBottom: '1.5rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '1rem'
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem'
  },
  blueButton: {
    backgroundColor: '#2563eb',
  },
  grayButton: {
    backgroundColor: '#4b5563',
  },
  resultCard: {
    padding: '1rem',
    borderRadius: '0.5rem'
  },
  blueCard: {
    backgroundColor: '#eff6ff'
  },
  greenCard: {
    backgroundColor: '#f0fdf4'
  },
  purpleCard: {
    backgroundColor: '#faf5ff'
  },
  resultText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  },
  alertBox: {
    backgroundColor: '#eff6ff',
    borderLeft: '4px solid #3b82f6',
    padding: '1rem',
    display: 'flex'
  }
};

// Birthday Paradox Simulator Logic
class BirthdayParadoxSimulator {
  /**
   * Calculate theoretical probability of birthday match
   * @param {number} n - Number of people in the group
   * @returns {number} Probability percentage
   */
  static calculateTheoreticalProbability(n) {
    if (n <= 0) return 0;
    if (n >= 365) return 100;

    let probability = 1.0;
    for (let i = 0; i < n; i++) {
      probability *= (365 - i) / 365;
    }

    return (1 - probability) * 100;
  }

  /**
   * Run simulations with more robust match detection
   * @param {number} groupSize - Number of people in the group
   * @param {number} simulationCount - Number of simulations
   * @returns {Object} Simulation results
   */
  static runSimulations(groupSize, simulationCount) {
    let dayMatchSimulations = 0;
    let exactMatchSimulations = 0;
    const detailedResults = [];

    for (let sim = 0; sim < simulationCount; sim++) {
      const birthdays = new Map(); // Use Map to track first occurrence
      const exactBirthdays = new Map();
      let dayMatchFound = false;
      let exactMatchFound = false;
      const simulationBirthdays = [];

      for (let person = 0; person < groupSize; person++) {
        const day = Math.floor(Math.random() * 365);
        const year = 1950 + Math.floor(Math.random() * 75);
        const exactBirthday = `${day}-${year}`;

        // Check day-only match
        if (birthdays.has(day) && !dayMatchFound) {
          dayMatchFound = true;
          dayMatchSimulations++;
        }

        // Check exact match
        if (exactBirthdays.has(exactBirthday) && !exactMatchFound) {
          exactMatchFound = true;
          exactMatchSimulations++;
        }

        // Store first occurrence
        if (!birthdays.has(day)) {
          birthdays.set(day, {day, year});
        }
        if (!exactBirthdays.has(exactBirthday)) {
          exactBirthdays.set(exactBirthday, {day, year});
        }

        simulationBirthdays.push({day, year});
      }

      // Store details for first 10 simulations
      if (sim < 10) {
        detailedResults.push({
          simulation: sim + 1,
          foundMatch: dayMatchFound,
          foundExactMatch: exactMatchFound,
          birthdays: simulationBirthdays
        });
      }
    }

    // Calculate probabilities
    const dayMatchProbability = (dayMatchSimulations / simulationCount) * 100;
    const exactMatchProbability = (exactMatchSimulations / simulationCount) * 100;
    const theoreticalProbability = this.calculateTheoreticalProbability(groupSize);

    return {
      matchCount: dayMatchSimulations,
      exactMatchCount: exactMatchSimulations,
      probability: dayMatchProbability,
      exactProbability: exactMatchProbability,
      expected: theoreticalProbability,
      detailedResults
    };
  }
}

// Convert day of year to a readable date
const convertToDate = (dayOfYear) => {
  const date = new Date(2024, 0, 1); // Use a leap year to handle all possible days
  date.setDate(date.getDate() + dayOfYear);
  return date.toLocaleString('fr-FR', { day: 'numeric', month: 'long' });
};

const BirthdayParadoxApp = () => {
  const [groupSize, setGroupSize] = useState(23);
  const [simulations, setSimulations] = useState(10000);
  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const runSimulations = () => {
    setIsSimulating(true);

    // Use setTimeout to allow UI to update before running complex simulation
    setTimeout(() => {
      const simulationResults = BirthdayParadoxSimulator.runSimulations(
        groupSize,
        simulations
      );

      setResults(simulationResults);
      setIsSimulating(false);
    }, 50);
  };

  const reset = () => {
    setResults(null);
    setShowYear(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainWrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>
            Simulateur du paradoxe des anniversaires
          </h1>
          <p style={styles.description}>
            Testez la probabilité que deux personnes dans un groupe partagent le même anniversaire.
            En théorie, avec 23 personnes, cette probabilité atteint 50%.
          </p>

          <div style={styles.grid}>
            <div>
              <label style={styles.label}>
                <Users size={16} style={{marginRight: '0.25rem'}} /> Taille du groupe
              </label>
              <input
                type="number"
                value={groupSize}
                onChange={(e) => setGroupSize(Math.max(2, parseInt(e.target.value) || 2))}
                style={styles.input}
                min="2"
                max="100"
              />
            </div>

            <div>
              <label style={styles.label}>
                <Calculator size={16} style={{marginRight: '0.25rem'}} /> Nombre de simulations
              </label>
              <input
                type="number"
                value={simulations}
                onChange={(e) => setSimulations(Math.max(100, parseInt(e.target.value) || 100))}
                style={styles.input}
                min="100"
                max="100000"
              />
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              onClick={runSimulations}
              disabled={isSimulating}
              style={{...styles.button, ...styles.blueButton, opacity: isSimulating ? 0.5 : 1}}
            >
              {isSimulating ? (
                <>
                  <RefreshCw size={16} style={{marginRight: '0.5rem', animation: 'spin 1s linear infinite'}} />
                  Simulation en cours...
                </>
              ) : (
                <>
                  <Play size={16} style={{marginRight: '0.5rem'}} />
                  Lancer la simulation
                </>
              )}
            </button>

            {results && (
              <button
                onClick={reset}
                style={{...styles.button, ...styles.grayButton}}
              >
                <RefreshCw size={16} style={{marginRight: '0.5rem'}} />
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {results && (
          <div style={styles.card}>
            <h2 style={{...styles.title, fontSize: '1.25rem', marginBottom: '1rem'}}>Résultats</h2>

            <div style={{...styles.grid, gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem'}}>
              <div style={{...styles.resultCard, ...styles.blueCard}}>
                <div style={{...styles.resultText, color: '#2563eb'}}>
                  {results.probability.toFixed(1)}%
                </div>
                <div style={{color: '#1e40af'}}>Probabilité empirique</div>
                <div style={{fontSize: '0.75rem', color: '#1e40af'}}>(jour seulement)</div>
              </div>

              <div style={{...styles.resultCard, ...styles.greenCard}}>
                <div style={{...styles.resultText, color: '#059669'}}>
                  {results.expected.toFixed(1)}%
                </div>
                <div style={{color: '#065f46'}}>Probabilité théorique</div>
                <div style={{fontSize: '0.75rem', color: '#065f46'}}>(jour seulement)</div>
              </div>

              <div style={{...styles.resultCard, ...styles.purpleCard}}>
                <div style={{...styles.resultText, color: '#7c3aed'}}>
                  {results.exactProbability.toFixed(1)}%
                </div>
                <div style={{color: '#5b21b6'}}>Probabilité exacte</div>
                <div style={{fontSize: '0.75rem', color: '#5b21b6'}}>(jour + année)</div>
              </div>

              <div style={{...styles.resultCard, backgroundColor: '#fef2f2'}}>
                <div style={{...styles.resultText, color: '#dc2626', fontSize: '1rem'}}>
                  {results.matchCount} / {results.exactMatchCount}
                </div>
                <div style={{color: '#991b1b'}}>Correspondances jour</div>
                <div style={{color: '#991b1b'}}>vs jour+année</div>
              </div>
            </div>

            <div style={{backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                <h3 style={{fontWeight: '600', color: '#374151'}}>
                  Échantillon des premières simulations
                </h3>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                  <input
                    type="checkbox"
                    checked={showYear}
                    onChange={(e) => setShowYear(e.target.checked)}
                    style={{width: '1rem', height: '1rem', cursor: 'pointer'}}
                  />
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>
                    Afficher les années de naissance
                  </span>
                </label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {results.detailedResults.map((detail, index) => (
                  <div key={index} style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: detail.foundMatch ? '2px solid #059669' : '1px solid #e5e7eb'
                  }}>
                    <div style={{
                      fontWeight: '600',
                      color: detail.foundMatch ? '#059669' : '#374151',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center'
                    }}>
                      Simulation {detail.simulation}
                      {detail.foundMatch && (
                        <span style={{
                          backgroundColor: '#dcfce7',
                          color: '#16a34a',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem'
                        }}>
                          Jour identique
                        </span>
                      )}
                      {detail.foundExactMatch && (
                        <span style={{
                          backgroundColor: '#f3e8ff',
                          color: '#7c3aed',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem'
                        }}>
                          Correspondance exacte
                        </span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      fontSize: '0.875rem'
                    }}>
                      {detail.birthdays.map((birthday, dateIndex) => {
                        const date = convertToDate(birthday.day);
                        const currentBirthday = birthday.day;
                        const currentYear = birthday.year;

                        return (
                          <span
                            key={dateIndex}
                            style={{
                              backgroundColor: detail.foundMatch && detail.birthdays.filter(b => b.day === currentBirthday).length > 1
                              ? '#fee2e2'  // Red for day match
                              : detail.foundExactMatch && detail.birthdays.some(b => b.day === currentBirthday && b.year === currentYear)
                                ? '#f3e8ff'  // Purple for exact match
                                : '#f3f4f6', // Gray for no match
                            color: detail.birthdays.filter(b => b.day === currentBirthday).length > 1
                              ? '#dc2626'
                              : detail.foundExactMatch && detail.birthdays.some(b => b.day === currentBirthday && b.year === currentYear)
                                ? '#7c3aed'
                                : '#4b5563',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.375rem',
                            border: detail.birthdays.filter(b => b.day === currentBirthday).length > 1
                              ? '1px solid #fca5a5'
                              : detail.foundExactMatch && detail.birthdays.some(b => b.day === currentBirthday && b.year === currentYear)
                                ? '1px solid #c084fc'
                                : '1px solid #e5e7eb'
                          }}
                        >
                          {date}
                          {showYear && (
                            <span style={{
                              marginLeft: '0.25rem',
                              color: detail.foundExactMatch && detail.birthdays.some(b => b.day === currentBirthday && b.year === currentYear)
                                ? '#7c3aed'
                                : '#9ca3af',
                              fontSize: '0.75rem',
                              fontWeight: detail.foundExactMatch && detail.birthdays.some(b => b.day === currentBirthday && b.year === currentYear)
                                ? '600'
                                : 'normal'
                            }}>
                              ({currentYear})
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={styles.alertBox}>
        <AlertCircle size={20} style={{color: '#2563eb', marginRight: '0.5rem', flexShrink: 0}} />
        <div style={{color: '#1d4ed8'}}>
          <h3 style={{fontWeight: '600'}}>À propos du paradoxe</h3>
          <p style={{marginTop: '0.25rem'}}>
            Le paradoxe des anniversaires démontre que la probabilité que deux personnes
            partagent le même anniversaire augmente rapidement avec la taille du groupe.
            Avec seulement 23 personnes, cette probabilité atteint 50%, ce qui est
            contre-intuitif pour beaucoup.
            {showYear && (
              <span style={{display: 'block', marginTop: '0.5rem', fontStyle: 'italic'}}>
                Note : L'année de naissance n'a aucun impact sur le paradoxe, seuls les jours comptent !
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default BirthdayParadoxApp;
