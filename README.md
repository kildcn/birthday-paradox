# Birthday Paradox Simulator

An interactive React application that demonstrates the fascinating Birthday Paradox, showcasing both classic day-only matches and exact birthday (day + year) probabilities.

## 🎂 Project Overview

The Birthday Paradox Simulator is an educational tool that helps users understand the counterintuitive nature of probability, specifically how likely it is for people in a group to share the same birthday.

### 🌟 Key Features

- **Interactive Simulation**: Adjust group size and simulation count
- **Dual Probability Calculation**:
  - Classic birthday paradox (matching days only)
  - Exact birthday matching (day + year)
- **Detailed Visualization**:
  - Color-coded birthday matches
  - Theoretical vs. Empirical probability comparison
- **Responsive Design**: Works on desktop and mobile devices

## 🧮 Mathematical Background

### Classic Birthday Paradox

The birthday paradox calculates the probability that at least two people in a group share the same birthday (day and month only).

#### Probability Calculation

The probability is calculated by finding the complement: the probability that all birthdays are different.

```math
P(at least one shared birthday) = 1 - P(all different birthdays)
```

Formal calculation:
```math
P(all different) = ∏(i=0 to n-1) [(365-i)/365]
P(at least one shared) = 1 - ∏(i=0 to n-1) [(365-i)/365]
```

### Exact Birthday Matching

When considering both day and year, the probability space dramatically expands:
- Classic paradox: 365 possible birthdays
- Exact matching: 365 × 75 = 27,375 possible birthdays

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/birthday-paradox-simulator.git
cd birthday-paradox-simulator
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

## 🔍 How It Works

### Simulation Algorithm

1. **Random Birthday Generation**
   - Randomly select a day (0-364)
   - Randomly assign a year (1950-2025)

2. **Match Detection**
   - Uses efficient data structures for match tracking
   - Separate tracking for day-only and exact matches
   - Prevents over-counting matches in a single simulation

3. **Probability Calculation**
   - Empirical: Count matches / Total simulations
   - Theoretical: Mathematical formula for classic paradox

## 📊 Interesting Insights

- With 23 people, the probability of a day-only match is ~50%
- Exact matches (day + year) are much rarer
- The paradox demonstrates how pairwise comparisons increase probability

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Submit pull requests
- Open issues
- Suggest improvements

## 📜 License

MIT License - Feel free to use for educational purposes.

## 🔗 Learn More

- [Birthday Problem - Wikipedia](https://en.wikipedia.org/wiki/Birthday_problem)
- [Probability Basics](https://www.khanacademy.org/math/statistics-probability)

## 🙌 Acknowledgments

Created as an interactive educational tool to demonstrate probability concepts and the fascinating Birthday Paradox.

## 🛠 Tech Stack

- React 19.1.0
- Lucide React for icons
- Native CSS-in-JS styling

## 🔬 Performance Optimizations

- Efficient match detection algorithm
- Configurable simulation count
- Responsive UI design
