import { Gauge } from "@/components/Gauge";

const Index = () => {
  const gauges = [
    { value: 75, label: "Performance", unit: "%", delay: 0 },
    { value: 45, label: "Temperature", unit: "°C", max: 100, delay: 200 },
    { value: 88, label: "Efficiency", unit: "%", delay: 400 },
    { value: 32, label: "Load", unit: "%", delay: 600 },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gauge-green via-gauge-yellow to-gauge-red bg-clip-text text-transparent">
            Performance Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time monitoring with animated gauges
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gauges.map((gauge, index) => (
            <Gauge
              key={index}
              value={gauge.value}
              label={gauge.label}
              unit={gauge.unit}
              max={gauge.max}
              delay={gauge.delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
