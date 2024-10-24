import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2 bg-black">
      <Head>
        <title>F1 Winner Predictor</title>
        <meta name="description" content="Predict the winner of the F1 season!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold text-white-800">
          Welcome to the F1 Winner Predictor!
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          Predict who will win the F1 season.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <a href="/predict" className="p-6 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <h3 className="text-2xl font-semibold">Start Prediction &rarr;</h3>
            <p className="mt-2 text-gray-600">Use historical data to predict the winner.</p>
          </a>

          <a href="/drivers" className="p-6 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <h3 className="text-2xl font-semibold">Drivers &rarr;</h3>
            <p className="mt-2 text-gray-600">See the list of current F1 drivers and their statistics.</p>
          </a>

          <a href="/about" className="p-6 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <h3 className="text-2xl font-semibold">About &rarr;</h3>
            <p className="mt-2 text-gray-600">Learn more about the prediction model and how it works.</p>
          </a>
        </div>
      </main>

      <footer className="w-full h-24 border-t flex items-center justify-center">
        <p className="text-white">Powered by Next.js </p>
      </footer>
    </div>
  );
}
