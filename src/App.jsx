import React, { useState } from 'react';
import { AlertCircle, Users, Calculator, Play, RefreshCw } from 'lucide-react';

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
  gridResponsive: {
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
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
  blueButtonHover: {
    backgroundColor: '#1d4ed8',
  },
  grayButton: {
    backgroundColor: '#4b5563',
  },
  grayButtonHover: {
    backgroundColor: '#374151',
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

const BirthdayParadoxSimulator = () => {
  const [groupSize, setGroupSize] = useState(23);
  const [simulations, setSimulations] = useState(1000);
  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationDetails, setSimulationDetails] = useState(null);
  const [showAllBirthdays, setShowAllBirthdays] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const runSimulations = () => {
    setIsSimulating(true);

    let matchCount = 0;
    let exactMatchCount = 0; // Nouveau compteur pour les correspondances exactes
    const detailedResults = [];

    for (let sim = 0; sim < simulations; sim++) {
      const birthdays = new Set();
      const exactBirthdays = new Set(); // Set pour les anniversaires avec année
      const birthdaysList = [];
      let foundMatch = false;
      let foundExactMatch = false;
      let matchingBirthday = null;
      let exactMatchingBirthday = null;

      // Générer des anniversaires aléatoires avec années
      const birthdaysWithYears = [];
      for (let person = 0; person < groupSize; person++) {
        const birthday = Math.floor(Math.random() * 365);
        const year = 1950 + Math.floor(Math.random() * 75); // Années aléatoires entre 1950 et 2025
        const exactBirthday = `${birthday}-${year}`; // Format: "jour-année"

        // Vérifier correspondance de jour uniquement
        if (birthdays.has(birthday)) {
          foundMatch = true;
          matchingBirthday = birthday;
          matchCount++;
        }

        // Vérifier correspondance exacte (jour + année)
        if (exactBirthdays.has(exactBirthday)) {
          foundExactMatch = true;
          exactMatchingBirthday = { day: birthday, year };
          exactMatchCount++;
        }

        birthdays.add(birthday);
        exactBirthdays.add(exactBirthday);
        birthdaysList.push(birthday);
        birthdaysWithYears.push({ day: birthday, year });
      }

      // Sauvegarder quelques simulations pour l'affichage
      if (sim < 10) {
        detailedResults.push({
          simulation: sim + 1,
          foundMatch: foundMatch,
          foundExactMatch: foundExactMatch,
          birthdays: birthdaysList,
          matchingBirthday: matchingBirthday,
          exactMatchingBirthday: exactMatchingBirthday,
          dates: birthdaysList.map(day => convertToDate(day)),
          birthdaysWithYears: birthdaysWithYears
        });
      }
    }

    const probability = (matchCount / simulations) * 100;
    const exactProbability = (exactMatchCount / simulations) * 100;

    setResults({
      matchCount,
      exactMatchCount,
      probability,
      exactProbability,
      expected: calculateExpectedProbability(groupSize)
    });

    setSimulationDetails(detailedResults);
    setIsSimulating(false);
  };

  // Convertir le jour de l'année en date
  const convertToDate = (dayOfYear) => {
    const date = new Date(2024, 0, 1); // Utiliser une année bissextile pour gérer tous les jours possibles
    date.setDate(date.getDate() + dayOfYear);
    return date.toLocaleString('fr-FR', { day: 'numeric', month: 'long' });
  };

  // Calcul de la probabilité théorique
  const calculateExpectedProbability = (n) => {
    if (n >= 365) return 100;

    let probability = 1;
    for (let i = 0; i < n; i++) {
      probability *= (365 - i) / 365;
    }

    return (1 - probability) * 100;
  };

  const reset = () => {
    setResults(null);
    setSimulationDetails(null);
    setShowAllBirthdays(false);
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
                {simulationDetails?.map((detail, index) => (
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
                          Exact Match!
                        </span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      fontSize: '0.875rem'
                    }}>
                      {detail.dates.map((date, dateIndex) => {
                        const currentBirthday = detail.birthdays[dateIndex];
                        const currentYear = detail.birthdaysWithYears[dateIndex]?.year;
                        const exactMatch = detail.exactMatchingBirthday?.day === currentBirthday &&
                                         detail.exactMatchingBirthday?.year === currentYear;

                        return (
                          <span
                            key={dateIndex}
                            style={{
                              backgroundColor: exactMatch
                                ? '#f3e8ff'  // Purple for exact match
                                : detail.matchingBirthday === currentBirthday
                                  ? '#fee2e2'  // Red for day match
                                  : '#f3f4f6', // Gray for no match
                              color: exactMatch
                                ? '#7c3aed'
                                : detail.matchingBirthday === currentBirthday
                                  ? '#dc2626'
                                  : '#4b5563',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.375rem',
                              border: exactMatch
                                ? '1px solid #c084fc'
                                : detail.matchingBirthday === currentBirthday
                                  ? '1px solid #fca5a5'
                                  : '1px solid #e5e7eb'
                            }}
                          >
                            {date}
                            {showYear && currentYear && (
                              <span style={{
                                marginLeft: '0.25rem',
                                color: exactMatch ? '#7c3aed' : '#9ca3af',
                                fontSize: '0.75rem',
                                fontWeight: exactMatch ? '600' : 'normal'
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

export default BirthdayParadoxSimulator;
