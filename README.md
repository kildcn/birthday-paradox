# Birthday Paradox Simulator

An interactive React application that demonstrates the famous Birthday Paradox - the counterintuitive probability theory that in a group of just 23 people, there's a 50% chance that two will share the same birthday.

## Demo

The application allows users to:
- Set the group size and number of simulations
- Run interactive simulations to calculate probabilities
- View detailed results with both empirical and theoretical probabilities
- See the actual birthdays generated in each simulation
- Toggle year display to demonstrate that only days matter, not birth years

## Features

- **Interactive simulation**: Adjust group size and simulation count
- **Real-time results**: Compare empirical vs theoretical probabilities
- **Detailed visualization**: See specific dates with matching birthdays highlighted
- **Year toggle**: Demonstrate that birth years don't affect the paradox
- **Responsive design**: Works on desktop and mobile devices
- **Clear highlighting**: Matching birthdays are visually highlighted in red

## Tech Stack

- React 19.1.0
- Lucide React for icons
- Native CSS-in-JS styling

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

## Usage

1. **Set Parameters**:
   - Group Size: Number of people in each simulation (default: 23)
   - Number of Simulations: How many test runs to perform (default: 1000)

2. **Run Simulation**:
   - Click "Launch Simulation" to start
   - Results appear automatically

3. **View Results**:
   - Empirical probability based on your simulations
   - Theoretical probability calculated mathematically
   - Detailed view of the first 10 simulations

4. **Toggle Years**:
   - Check "Show birth years" to see that only days matter
   - Years are displayed for educational purposes only

## Mathematical Background

The Birthday Paradox states that in a random group of 23 people, there's about a 50% probability that two people share the same birthday. This seems counterintuitive because 23 is such a small number compared to 365 days in a year.

The theoretical probability is calculated as:
```
P(shared birthday) = 1 - P(all different birthdays)
P(all different birthdays) = 365/365 × 364/365 × 363/365 × ... × (365-n+1)/365
```

## Project Structure

```
birthday-paradox/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.js         # Entry point
│   └── ...
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the classic probability theory problem
- Created as an educational tool to demonstrate counterintuitive probability concepts
- Built with React for interactive learning

## Learn More

- [Birthday Problem - Wikipedia](https://en.wikipedia.org/wiki/Birthday_problem)
- [React Documentation](https://reactjs.org/)
- [Probability Theory Basics](https://www.khanacademy.org/math/statistics-probability/probability-library)

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
