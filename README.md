# Birthday Paradox Simulator

An interactive React application that demonstrates the famous Birthday Paradox. It shows both the classic paradox (matching days only) and the exact birthday match (day + year) probability comparison.

## Demo

[Live Demo](https://birthday-paradox.onrender.com/)

## Features

- **Interactive simulation** with adjustable group size and simulation count
- **Classic birthday paradox** (matching days only)
- **Exact birthday matching** (day + year) comparison
- **Visual representation** of birthdays with color-coded matches
- **Real-time probability calculations**
- **Toggle year display** to understand the difference between day-only and exact matches

## Mathematical Background

### Classic Birthday Paradox

The birthday paradox calculates the probability that at least two people in a group share the same birthday (day and month only).

#### Theoretical Probability Calculation

The probability is calculated by finding the complement: the probability that all birthdays are different.

```math
P(at least one shared birthday) = 1 - P(all different birthdays)
```

For n people:
```math
P(all different) = 365/365 × 364/365 × 363/365 × ... × (365-n+1)/365
```

Or more formally:
```math
P(all different) = ∏(i=0 to n-1) [(365-i)/365]
```

Therefore:
```math
P(at least one shared birthday) = 1 - ∏(i=0 to n-1) [(365-i)/365]
```

#### Implementation in Code

```javascript
const calculateExpectedProbability = (n) => {
    if (n >= 365) return 100;

    let probability = 1;
    for (let i = 0; i < n; i++) {
        probability *= (365 - i) / 365;
    }

    return (1 - probability) * 100;
};
```

### Exact Birthday Matching (Including Year)

When considering both day and year, the number of possible birthdays increases dramatically.

#### Probability Space Expansion

With a 75-year range (1950-2025):
- Classic paradox: 365 possible birthdays
- Exact matching: 365 × 75 = 27,375 possible birthdays

This dramatically reduces the probability of finding a match.

#### Empirical Calculation

For simulation results:
```math
P(empirical) = Number of matches / Total simulations × 100
```

For both classic and exact matching:
```javascript
const probability = (matchCount / simulations) * 100;
const exactProbability = (exactMatchCount / simulations) * 100;
```

### Why the Paradox Works

The counterintuitive nature comes from the number of pairwise comparisons:

For n people:
```math
Number of pairs = C(n,2) = n(n-1)/2
```

With 23 people:
```math
C(23,2) = 23×22/2 = 253 pairs
```

Each pair has 1/365 chance of matching, leading to:
```math
P(at least one match) ≈ 1 - (364/365)^253 ≈ 50.7%
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/birthday-paradox.git
cd birthday-paradox
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for deployment as a static site on Render.com:

1. Connect your GitHub repository to Render
2. Choose "Static Site"
3. Build command: `npm install && npm run build`
4. Publish directory: `build`

## Implementation Details

### Core Algorithm

1. **Random Birthday Generation**
   ```javascript
   const birthday = Math.floor(Math.random() * 365);
   const year = 1950 + Math.floor(Math.random() * 75);
   ```

2. **Match Detection**
   - Uses JavaScript `Set` for O(1) lookup
   - Tracks both day-only and exact matches
   - Counts matches across multiple simulations

3. **Probability Calculation**
   - Empirical: Count matches / Total simulations
   - Theoretical: Mathematical formula for classic paradox

### Performance Optimizations

- Uses `Set` for fast duplicate detection
- Early exit when match is found
- Limits detailed output to first 10 simulations

## Tech Stack

- React 19.1.0
- Lucide React for icons
- Native CSS-in-JS styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for educational purposes.

## Learn More

- [Birthday Problem - Wikipedia](https://en.wikipedia.org/wiki/Birthday_problem)
- [Understanding Probability](https://www.khanacademy.org/math/statistics-probability)
- [React Documentation](https://reactjs.org/)

## Acknowledgments

Created as an educational tool to demonstrate probability concepts and the counterintuitive nature of the birthday paradox.
